import { object, string } from 'zod'
import { createZodDto } from 'nestjs-zod'

const createPostSchema = object({
  content: string().min(1).max(255),
})

export class CreatePostDto extends createZodDto(createPostSchema) {}
