import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { PostsService } from '@/posts/posts.service'
import { Request } from 'express'

@Injectable()
export class IsPostOwner implements CanActivate {
  constructor(private readonly postsService: PostsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()

    if (!request.user) return false

    const postId = request.params.postId

    const isOwner = await this.postsService.isPostOwner(request.user.id, postId)

    return isOwner
  }
}
