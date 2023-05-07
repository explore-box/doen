import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { EmailPassAuthInput } from './models/auth.input'
import { TokenService } from './token.service'
import { AuthPayload } from './models/auth.payload'
import { SessionService } from './session.service'
import { Request } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService
  ) {}

  /**
   * ## emailPassAuth
   *
   * authenticate the user using email and password
   *
   * @param body the user input
   * @returns AuthPayload
   */
  async emailPassAuth(
    body: EmailPassAuthInput,
    req: Request
  ): Promise<AuthPayload> {
    const user = await this.userService.signinUserWithEmailPassword(body)
    const [token, tokenId] = await this.tokenService.createLoginToken(user)
    await this.sessionService.createUserSession(user.id, tokenId, req)

    return {
      user,
      ...token
    }
  }
}
