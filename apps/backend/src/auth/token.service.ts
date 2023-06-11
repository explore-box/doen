import { Inject, Injectable } from '@nestjs/common'
import { Tigris } from '@tigrisdata/core'
import { TIGRIS_PROVIDER } from '~/config/constants/tigris.constant'
import { LoginTokenPayload } from './models/auth.payload'
import { JwtService } from '@nestjs/jwt'
import { UserPayload } from '~/user/models/user.payload'
import { TokenSchema } from './models/token.schema'

@Injectable()
export class TokenService {
  constructor(
    @Inject(TIGRIS_PROVIDER) private readonly tigrisClient: Tigris,
    private readonly jwtService: JwtService
  ) {}

  /**
   * ## checkAccessToken
   *
   * check the user token
   * @param userId the id of user
   * @returns TokenSchema
   */
  async checkAccessToken(userId: string): Promise<TokenSchema> {
    const token = await this.tigrisClient
      .getDatabase()
      .getCollection<TokenSchema>(TokenSchema)
      .findOne({
        filter: {
          userId
        }
      })

    return token
  }

  /**
   * ## createLoginToken
   *
   * create the both access and refresh tokenn
   *
   * @param user user payload
   * @returns LoginTokenPayload
   */
  async createLoginToken(
    user: UserPayload
  ): Promise<[LoginTokenPayload, string]> {
    // create the access token and refreshToken
    const accessToken = await this.jwtService.signAsync({
      iss: 'https://doen-api.vercel.app',
      sub: user.id,
      email: user.email,
      role: user.role
    })
    const refreshToken = await this.jwtService.signAsync({
      iss: 'https://doen-api.vercel.app',
      sub: user.id,
      email: user.email,
      type: 'refresh'
    })

    // check the user tokens and delete if found
    // to replace with the new one
    let prevAccessToken = await this.checkAccessToken(user.id)
    if (prevAccessToken) {
      await this.tigrisClient
        .getDatabase()
        .getCollection<TokenSchema>(TokenSchema)
        .deleteOne({
          filter: {
            id: prevAccessToken.id
          }
        })
    }

    const token = await this.tigrisClient
      .getDatabase()
      .getCollection<TokenSchema>(TokenSchema)
      .insertOne({
        email: user.email,
        userId: user.id,
        token: accessToken,
        type: 'access',
        desc: `${user.email} Access token`,
        expiredAt: new Date(new Date().getHours() + 24)
      })

    return [
      {
        accessToken,
        refreshToken
      },
      token.id
    ]
  }
}
