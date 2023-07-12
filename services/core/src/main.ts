import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import * as compression from 'compression'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: false,
    }),
  )
  app.enableCors()
  app.use(compression())
  app.use(helmet())

  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')

  await app.listen(port)
}
bootstrap()
