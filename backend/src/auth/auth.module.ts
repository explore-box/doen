import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UserModule } from 'src/user/user.module'
import { TokenService } from './token.service'
import { SessionService } from './session.service'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        global: true,
        signOptions: {
          expiresIn: '1d'
        },
        secret: config.get<string>('AUTH_JWT_SECRET')
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, SessionService],
  exports: [AuthService, TokenService, SessionService]
})
export class AuthModule {}
