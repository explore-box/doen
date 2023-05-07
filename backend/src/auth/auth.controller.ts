import { Body, Controller, Post, Req } from '@nestjs/common'
import { AuthPayload } from './models/auth.payload'
import { AuthService } from './auth.service'
import { EmailPassAuthInput } from './models/auth.input'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: AuthPayload })
  @Post('email-pass')
  async emailAuth(
    @Body() body: EmailPassAuthInput,
    @Req() req: Request
  ): Promise<AuthPayload> {
    return this.authService.emailPassAuth(body, req)
  }
}
