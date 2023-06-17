import { Module } from '@nestjs/common'
import { PostsService } from '@/posts/posts.service'
import { PostsController } from '@/posts/posts.controller'
import { PrismaModule } from '@/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
