import { BehaviorSubject } from 'rxjs'
import { type User } from '@/services/http/auth'

export const authStore = new BehaviorSubject<User | null>(null)
