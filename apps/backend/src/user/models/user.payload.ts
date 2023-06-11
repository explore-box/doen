import { OmitType } from '@nestjs/swagger'
import { UserSchema } from './user.schema'

export class UserPayload extends OmitType(UserSchema, ['password'] as const) {}
