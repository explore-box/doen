import { ApiProperty } from '@nestjs/swagger'
import {
  Field,
  PrimaryKey,
  SearchField,
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
  @SearchField({ sort: true })
  @Field()
  device?: 'browser' | 'desktop' | 'mobile'

  @ApiProperty()
  @SearchField({ sort: true })
  @Field()
  os?: string

  @ApiProperty()
  @Field()
  tokenId?: string

  @ApiProperty()
  @Field({ default: new Date(), timestamp: 'createdAt' })
  createdAt?: Date

  @ApiProperty()
  @Field({ default: new Date(), timestamp: 'updatedAt' })
  updatedAt?: Date
}
