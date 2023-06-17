import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { PostsService } from '@/posts/posts.service'
import { IsAuthenticated } from '@/auth/auth.guard'
import { CreatePostDto } from './posts.dto'
import { User } from '@/auth/auth.decorator'
import { IsPostOwner } from '@/posts/guards/is-post-owner'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.postsService.getPosts(page)
  }

  @Post()
  @UseGuards(IsAuthenticated)
  async createPost(@User() user: User, @Body() data: CreatePostDto) {
    return this.postsService.createPost(user.id, data)
  }

  @Delete(':postId')
  @UseGuards(IsAuthenticated, IsPostOwner)
  async deletePost(@Param('postId') postId: string) {
    return await this.postsService.deletePost(postId)
  }
}
