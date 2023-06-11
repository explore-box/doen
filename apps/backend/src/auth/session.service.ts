import { Inject, Injectable } from '@nestjs/common'
import { Tigris } from '@tigrisdata/core'
import { Request } from 'express'
import { TIGRIS_PROVIDER } from '~/config/constants/tigris.constant'
import { SessionSchema } from '~/auth/models/session.schema'

@Injectable()
export class SessionService {
  constructor(@Inject(TIGRIS_PROVIDER) private readonly tigrisClient: Tigris) {}

  /**
   * ## deletePrevSession
   *
   * delete the previous session
   * @param userId id of user
   * @param device device of user agent
   */
  async deletePrevSession(userId: string, device: any): Promise<void> {
    await this.tigrisClient
      .getDatabase()
      .getCollection<SessionSchema>(SessionSchema)
      .deleteOne({
        filter: {
          userId,
          device
        }
      })
  }

  /**
   * ## createUserSession
   *
   * create the user session data record
   * that assign the current user position of user
   * including device, os, browser
   *
   * @param userId id of user
   * @param tokenId token that recently created
   * @param req request from user
   */
  async createUserSession(
    userId: string,
    tokenId: string,
    req: Request
  ): Promise<void> {
    const userAgent = req.useragent
    const device = userAgent.isDesktop
      ? 'desktop'
      : userAgent.isMobile
      ? 'mobile'
      : 'browser'
    const os = userAgent.os

    await this.deletePrevSession(userId, device)
    await this.tigrisClient
      .getDatabase()
      .getCollection<SessionSchema>(SessionSchema)
      .insertOne({
        device,
        os,
        userId,
        tokenId
      })
  }
}
