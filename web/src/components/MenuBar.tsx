import { clearAuthToken, type User } from '@/services/http/auth'
import { saveToken } from '@/services/storage/auth'
import { resolveStatic } from '@/utils/files'
import {
  HomeIcon,
  BellIcon,
  EyeIcon,
  BookmarkIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

type MenuBarProps = {
  user: User
}

export default function MenuBar({ user }: MenuBarProps) {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    saveToken(null)
    clearAuthToken()

    navigate('/')
  }

  return (
    <nav className="p-4 w-64 border-r flex flex-col">
      <h1 className="mb-4 text-3xl font-bold tracking-tighter bg-gradient-to-br from-sky-500 to-blue-600 text-transparent w-min bg-clip-text">
        Anônimo
      </h1>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-2">
          <HomeIcon className="w-6 h-6" />
          <span className="tracking-tight">Página inicial</span>
        </div>
        <div className="flex items-center gap-2">
          <BellIcon className="w-6 h-6" />
          <span className="tracking-tight">Notificações</span>
        </div>
        <div className="flex items-center gap-2">
          <EyeIcon className="w-6 h-6" />
          <span className="tracking-tight">Seguindo</span>
        </div>
        <div className="flex items-center gap-2">
          <BookmarkIcon className="w-6 h-6" />
          <span className="tracking-tight">Salvos</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={resolveStatic(user.profileImage)}
            alt={user.username}
            className="w-6 h-6 rounded-full"
          />
          <span>Perfil</span>
        </div>
        <button
          onClick={handleSignOut}
          className="mt-auto bg-red-600 text-white py-1 rounded-full flex items-center justify-center gap-2"
        >
          <ArrowLeftOnRectangleIcon className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>
    </nav>
  )
}
