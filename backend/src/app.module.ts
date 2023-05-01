import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TigrisModule } from './tigris/tigris.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { UserSchema } from './user/model/user.schema'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    ThrottlerModule.forRoot({
      limit: 10,
      ttl: 60
    }),
    TigrisModule.forRoot({ schemas: [UserSchema] }),

    // feature module
    UserModule,
    AuthModule
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
