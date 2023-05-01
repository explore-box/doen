import { Inject, Injectable } from '@nestjs/common'
import { Tigris } from '@tigrisdata/core'
import { TIGRIS_PROVIDER } from 'src/tigris/tigris.constant'

@Injectable()
export class UserService {
  constructor(@Inject(TIGRIS_PROVIDER) private readonly client: Tigris) {}
}
