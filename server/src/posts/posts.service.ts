import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './posts.dto'

const LIMIT = 20

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async isPostOwner(userId: string, postId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    })

    if (!post) return false

    return post.authorId === userId
  }

  async deletePost(postId: string) {
    return await this.prisma.post.delete({
      where: { id: postId },
    })
  }

  async getPosts(page: number) {
    const posts = await this.prisma.post.findMany({
      take: LIMIT,
      skip: (page - 1) * LIMIT,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
          },
        },
      },
    })

    return await Promise.all(
      posts.map(async (post) => ({
        ...post,
        likes: 0,
        comments: await this.prisma.comment.count({
          where: { postId: post.id },
        }),
      })),
    )
  }

  async createPost(userId: string, data: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        ...data,
        authorId: userId,
      },
    })
  }
}
