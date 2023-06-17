import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthService } from '@/auth/auth.service'
import { SignInDto, SignUpDto } from '@/auth/auth.dto'
import { IsAuthenticated } from '@/auth/auth.guard'
import { User } from '@/auth/auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UseInterceptors(FileInterceptor('profileImage'))
  async signUp(
    @Body() data: SignUpDto,
    @UploadedFile() profileImage: IncomingFile,
  ) {
    const { password: _, ...user } = await this.authService.signUp(
      data,
      profileImage,
    )

    return user
  }

  @Post('sign-in')
  async signIn(@Body() data: SignInDto) {
    return await this.authService.signIn(data)
  }

  @Get('profile')
  @UseGuards(IsAuthenticated)
  async getProfile(@User() user: User) {
    return user
  }
}
