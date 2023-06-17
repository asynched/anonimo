import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new NotFoundException('User was not found')
    }

    const { banned, email, password, ...safeUser } = user

    return safeUser
  }
}
