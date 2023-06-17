import { object, string, date } from 'zod'
import { createZodDto } from 'nestjs-zod'

const usernameRegex = /^[a-zA-Z0-9_]+$/

const signUpDto = object({
  name: string().min(1).max(255),
  email: string().email().max(255),
  username: string().regex(usernameRegex).min(1).max(16),
  birthDate: string().datetime(),
  password: string().min(8).max(255),
})

export class SignUpDto extends createZodDto(signUpDto) {}

const signInDto = object({
  email: string().email().min(1).max(255),
  password: string().min(8).max(255),
})

export class SignInDto extends createZodDto(signInDto) {}
