import { ApiProperty } from '@nestjs/swagger'
import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes
} from '@tigrisdata/core'

@TigrisCollection('sessions')
export class SessionSchema {
  @ApiProperty()
  @PrimaryKey(TigrisDataTypes.STRING, { order: 1, autoGenerate: true })
  id?: string

  @ApiProperty()
  @Field()
  userId?: string

  @ApiProperty()
  @Field()
  device?: string

  @ApiProperty()
  @Field()
  ip?: string

  @ApiProperty()
  @Field()
  key?: string

  @ApiProperty()
  @Field()
  status?: string

  @ApiProperty()
  @Field()
  createdAt?: string

  @ApiProperty()
  @Field()
  updatedAt?: string
}
