import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { UserModule } from '~/user/user.module'
import { AuthModule } from '~/auth/auth.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TigrisProvider } from '~/config/providers/tigris.provider'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    ThrottlerModule.forRoot({
      limit: 10,
      ttl: 60
    }),
    ScheduleModule.forRoot(),

    // feature module
    UserModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    TigrisProvider
  ],
  exports: [TigrisProvider]
})
export class AppModule {}
