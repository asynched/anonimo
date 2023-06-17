import { getToken } from '@/services/storage/auth'
import { getUserProfile, setAuthToken } from '@/services/http/auth'
import { authStore } from '@/stores/auth'

export const authGuard = async () => {
  const token = getToken()

  if (!token) {
    return false
  }

  setAuthToken(token)
  const user = await getUserProfile()
  authStore.next(user)

  return true
}

export const publicOnlyGuard = () => authGuard().then((isAuth) => !isAuth)
