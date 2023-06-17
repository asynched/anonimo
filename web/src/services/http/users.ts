import { httpClient } from './client'

export type User = {
  id: string
  name: string
  username: string
  bio: string
  birthDate: string
  profileImage: string
  backgroundImage: string
  createdAt: string
  updatedAt: string
}

export const getUser = async (id: string) => {
  const { data } = await httpClient.get<User>(`/users/${id}`)

  return data
}
