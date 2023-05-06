import { ApiProperty } from '@nestjs/swagger'
import { UserPayload } from 'src/user/models/user.payload'

export class AuthPayload {
  @ApiProperty()
  user: UserPayload

  @ApiProperty()
  accessToken: string

  @ApiProperty()
  refreshToken: string
}

export class LoginTokenPayload {
  @ApiProperty()
  accessToken: string

  @ApiProperty()
  refreshToken: string
}
