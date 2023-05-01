import { DynamicModule, Global, Logger, Module, Provider } from '@nestjs/common'
import { TigrisRootOptions } from './tigris.interface'
import { TIGRIS_PROVIDER } from './tigris.constant'
import { Tigris } from '@tigrisdata/core'

@Global()
@Module({})
export class TigrisModule {
  /**
   * # forRoot
   *
   * start to use the tigris module while
   * register the schema and using the client
   * @returns DynamicModule
   */
  static forRoot({ schemas }: TigrisRootOptions): DynamicModule {
    const logger = new Logger('Database')

    // define the tigris provider
    // use to return the tigris client
    // and register the schema
    const TigrisProvider: Provider = {
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

    return {
      module: TigrisModule,
      providers: [TigrisProvider],
      exports: [TigrisProvider]
    }
  }
}
