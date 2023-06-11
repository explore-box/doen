import { Logger, Provider } from '@nestjs/common'
import { TIGRIS_PROVIDER } from '../constants/tigris.constant'
import { Tigris, TigrisCollectionType } from '@tigrisdata/core'
import { UserSchema } from '~/user/models/user.schema'
import { TokenSchema } from '~/auth/models/token.schema'
import { SessionSchema } from '~/auth/models/session.schema'

const logger = new Logger('Database')

// TODO: define the database schemas
const schemas: TigrisCollectionType[] = [UserSchema, TokenSchema, SessionSchema]

/**
 * # TigrisProvider
 *
 * provider to connect with tigris database
 * also register the schema
 */
export const TigrisProvider: Provider = {
  provide: TIGRIS_PROVIDER,
  useFactory: async () => {
    const client = new Tigris()

    try {
      logger.log(`🚀 Connecting to database ... `)
      await client.getDatabase().initializeBranch()

      logger.log(`🍀 Registering the database schema`)
      await client.registerSchemas(schemas)

      logger.log(`🎉 Database connected`)
    } catch (error) {
      logger.error(
        `🧐 Opps, something error while connecting to database cause:${error}`
      )
    }

    return client
  }
}
