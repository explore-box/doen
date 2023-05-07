import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // pass the guard when the public decorator found
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    // only activate if no public decorator found
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('auth/unauthenticated', {
        cause: new Error(),
        description: 'Please signin before use this resources'
      })
    }

    // validate the token payload

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.AUTH_JWT_SECRET
      })

      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException('auth/unauthorized', {
        cause: new Error(),
        description: 'You dont have any access to this resource'
      })
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization.split(' ') || []
    return type == 'Bearer' ? token : undefined
  }
}
