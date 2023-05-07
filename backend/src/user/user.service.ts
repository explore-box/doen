import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { Tigris } from '@tigrisdata/core'
import { UserPayload } from './models/user.payload'
import { UserSchema } from './models/user.schema'
import { TIGRIS_PROVIDER } from '~/config/constants/tigris.constant'
import { EmailUserInput } from './models/user.input'
import { compare, genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(@Inject(TIGRIS_PROVIDER) private readonly tigrisClient: Tigris) {}

  /**
   * ## checkUser
   *
   * check if the user already exist or not
   * @returns UserSchema
   */
  async checkUser(args: { email: string }): Promise<UserSchema> {
    const res = await this.tigrisClient
      .getDatabase()
      .getCollection<UserSchema>(UserSchema)
      .findOne({
        filter: {
          email: args.email
        }
      })

    return res
  }

  /**
   * ## hashingPassword
   *
   * Secure the user password by hashing
   *
   * @param password the user password to hashing
   * @returns string
   */
  async hashingPassword(password: string): Promise<string> {
    const salt = await genSalt(12)
    const hashedPassword = await hash(password, salt)

    return hashedPassword
  }

  /**
   * ## comparePass
   *
   * compare the passwor if it's match
   *
   * @param password the current user pasword
   * @param hashedPassword hashed version password
   * @returns boolean
   */
  async comparePass(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compare(password, hashedPassword)
  }

  /**
   * ## signinUserWithEmailPassword
   *
   * create the user with email and password
   *
   * @param body contain the user data
   * @returns UserPayload
   */
  async signinUserWithEmailPassword(
    body: EmailUserInput
  ): Promise<UserPayload> {
    // check if the user is already exist
    let user = await this.checkUser({ email: body.email })

    if (!user) {
      // create a new user
      const hashPass = await this.hashingPassword(body.password)
      const input: UserSchema = {
        email: body.email,
        providers: ['email'],
        role: 'user',
        status: 'active',
        password: hashPass,
        username: body.email.split('@')[0]
      }
      user = await this.tigrisClient
        .getDatabase()
        .getCollection<UserSchema>(UserSchema)
        .insertOne(input)
    } else {
      const isMatch = await this.comparePass(body.password, user.password)
      if (!isMatch) {
        throw new ForbiddenException('auth/invalid-password', {
          cause: new Error(),
          description: `Opps, your password look weird`
        })
      }

      // assign the provider if not found
      if (!user.providers.includes('email')) {
        await this.tigrisClient
          .getDatabase()
          .getCollection<UserSchema>(UserSchema)
          .updateOne({
            filter: {
              email: user.email
            },
            fields: {
              providers: [...user.providers, 'email']
            }
          })
      }
    }

    return user
  }
}
