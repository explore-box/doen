import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TigrisModule } from 'src/tigris/tigris.module'

@Module({
  imports: [TigrisModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
