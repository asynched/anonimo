import { authStore } from '@/stores/auth'
import { useObservable } from '@/hooks/useObservable'

export function useAuth() {
  const user = useObservable(authStore)

  if (!user) {
    throw new Error('User is not authenticated')
  }

  return user
}
