import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class IsAuthenticated implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()

    const authHeader = request.headers['authorization']

    if (!authHeader) return false
    if (!authHeader.startsWith('Bearer')) return false

    const token = authHeader.replace('Bearer ', '')

    try {
      const payload = this.jwt.decode(token) as User

      request.user = {
        id: payload.id,
        name: payload.name,
        username: payload.username,
        email: payload.email,
        backgroundImage: payload.backgroundImage,
        profileImage: payload.profileImage,
        bio: payload.bio,
        birthDate: new Date(payload.birthDate),
        banned: payload.banned,
        createdAt: new Date(payload.createdAt),
        updatedAt: new Date(payload.updatedAt),
      }

      return true
    } catch (err) {
      return false
    }
  }
}
