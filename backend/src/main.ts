import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as compression from 'compression'
import helmet from 'helmet'
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType
} from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

// define app props
const PORT = parseInt(process.env.PORT, 10) || 4000

/**
 * # createOpenAPIDocument
 *
 * create the openAI Swagger document
 * @param app the nestjs application
 */
function createOpenAPIDocument(app: INestApplication) {
  const logger = new Logger('OpenAPI')

  logger.log(`🍀 Creating the OpenAPI Document`)
  const config = new DocumentBuilder()
    .setTitle('DOEN API')
    .addTag('api', 'The backend api')
    .addBearerAuth()
    .addOAuth2()
    .setDescription(
      'Doen Application plaform Backend API. Integrations, and provide service data'
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)

  logger.log(`🎉 Open API Document Created`)
}

/**
 * # bootstrap
 *
 * start the application
 * by bootstrap all of the resources
 */
async function bootstrap() {
  const logger = new Logger('APP')
  const app = await NestFactory.create(AppModule)

  // register the app security, plugins,
  // and other middleware
  app.enableVersioning({ type: VersioningType.URI })
  app.useGlobalPipes(new ValidationPipe({}))
  app.use(compression())
  app.use(helmet())
  app.enableCors({
    origin: '*'
  })

  // create swagger document
  createOpenAPIDocument(app)

  await app.listen(PORT, () => {
    logger.log(`🎉 Application running on port ${PORT}`)
  })
}

bootstrap()
