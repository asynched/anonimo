import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '@/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id)
  }
}
