import { compare, genSalt, hash } from 'bcrypt'
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/prisma/prisma.service'
import { StorageService } from '@/storage/storage.service'
import { SignInDto, SignUpDto } from '@/auth/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    private readonly jwt: JwtService,
  ) {}

  async signUp(data: SignUpDto, profileImage: IncomingFile) {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: await hash(data.password, await genSalt()),
        backgroundImage: '',
        profileImage: '',
        bio: '',
      },
    })

    const { relativePath } = await this.storage.upload(
      'profile',
      `${user.id}-${profileImage.originalname}`,
      profileImage.buffer,
    )

    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        profileImage: relativePath,
      },
    })
  }

  async signIn(data: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const isPasswordValid = await compare(data.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    const { password: _, ...userWithoutPassword } = user
    const token = this.jwt.sign(userWithoutPassword)

    return {
      token,
    }
  }
}
