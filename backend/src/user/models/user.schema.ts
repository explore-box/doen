import { ApiProperty } from '@nestjs/swagger'
import {
  Field,
  PrimaryKey,
  SearchField,
  TigrisCollection,
  TigrisDataTypes
} from '@tigrisdata/core'

@TigrisCollection('users')
export class UserSchema {
  @ApiProperty({ description: 'The id for user' })
  @PrimaryKey(TigrisDataTypes.STRING, { order: 1, autoGenerate: true })
  id?: string

  @ApiProperty()
  @SearchField({ sort: true })
  @Field()
  fullName?: string

  @ApiProperty()
  @SearchField({ sort: true })
  @Field()
  email?: string

  @ApiProperty()
  @SearchField({ sort: true })
  @Field()
  username?: string

  @ApiProperty()
  @Field()
  password?: string

  @ApiProperty()
  @Field()
  bio?: string

  @ApiProperty()
  @Field({ elements: TigrisDataTypes.STRING })
  providers?: ('email' | 'google' | 'github')[]

  @ApiProperty()
  @Field()
  birthDate?: Date

  @ApiProperty()
  @Field()
  address?: string

  @ApiProperty()
  @Field()
  avatar?: string

  @ApiProperty()
  @Field()
  cover?: string

  @ApiProperty()
  @Field()
  status?: 'active' | 'disabled'

  @ApiProperty()
  @Field()
  role?: 'user' | 'admin'

  @ApiProperty()
  @Field({ default: new Date(), timestamp: 'createdAt' })
  createdAt?: Date

  @ApiProperty()
  @Field({ default: new Date(), timestamp: 'updatedAt' })
  updatedAt?: Date
}
