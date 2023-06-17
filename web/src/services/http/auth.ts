import { httpClient } from '@/services/http/client'

export type SignInDto = {
  email: string
  password: string
}

export type SignUpDto = {
  email: string
  password: string
  name: string
  username: string
  profileImage: File
  birthDate: Date
}

export type User = {
  id: string
  name: string
  username: string
  email: string
  bio: string
  birthDate: Date
  banned: boolean
  profileImage: string
  backgroundImage: string
  createdAt: Date
  updatedAt: Date
}

export type TokenAuthResponse = {
  token: string
}

export const signIn = async (dto: SignInDto) => {
  const { data } = await httpClient.post<TokenAuthResponse>(
    '/auth/sign-in',
    dto,
  )

  httpClient.defaults.headers['Authorization'] = `Bearer ${data.token}`

  return data.token
}

export const signUp = async (dto: SignUpDto) => {
  await httpClient.post('/auth/sign-up', dto, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getUserProfile = async () => {
  const { data } = await httpClient.get<User>('/auth/profile')

  return data
}

export const setAuthToken = (token: string | null) => {
  httpClient.defaults.headers['Authorization'] = `Bearer ${token}`
}

export const clearAuthToken = () => {
  delete httpClient.defaults.headers['Authorization']
}
