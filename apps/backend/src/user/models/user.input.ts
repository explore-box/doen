import { IsEmail, IsString } from 'class-validator'

export class EmailUserInput {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
