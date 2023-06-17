import { httpClient } from '@/services/http/client'

export type CreatePostDto = {
  content: string
}

export type Author = {
  id: string
  username: string
  profileImage: string
  name: string
}

export type Post = {
  id: string
  content: string
  authorId: string
  author: Author
  likes: number
  comments: number
  createdAt: string
  updatedAt: string
}

export const createPost = async (dto: CreatePostDto) => {
  await httpClient.post('/posts', dto)
}

export const getPosts = async (page: number) => {
  const { data } = await httpClient.get<Post[]>('/posts', {
    params: {
      page,
    },
  })

  return data
}

export const deletePost = async (postId: string) => {
  await httpClient.delete(`/posts/${postId}`)
}
