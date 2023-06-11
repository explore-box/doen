import { ApiProperty } from '@nestjs/swagger'
import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes
} from '@tigrisdata/core'

@TigrisCollection('tokens')
export class TokenSchema {
  @ApiProperty()
  @PrimaryKey(TigrisDataTypes.STRING, { order: 1, autoGenerate: true })
  id?: string

  @ApiProperty()
  @Field()
  userId?: string

  @ApiProperty()
  @Field()
  email?: string

  @ApiProperty()
  @Field()
  token?: string

  @ApiProperty({ enum: ['verification', 'login', 'auth'] })
  @Field()
  type?: 'verification' | 'login' | 'auth' | 'access' | 'refresh'

  @ApiProperty()
  @Field()
  desc?: string

  @ApiProperty()
  @Field()
  expiredAt?: Date

  @ApiProperty()
  @Field({ default: new Date(), timestamp: 'updatedAt' })
  createdAt?: Date

  @ApiProperty()
  @Field({ default: new Date(), timestamp: 'updatedAt' })
  updatedAt?: Date
}
