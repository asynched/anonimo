import { getUser } from '@/services/http/users'
import { formatDate } from '@/utils/dates'
import { resolveStatic } from '@/utils/files'
import { stopPropagation } from '@/utils/ui'

import { CalendarIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type UserModalProps = {
  userId: string
  onClose: () => unknown
}

export default function UserModal({ userId, onClose }: UserModalProps) {
  const { data: user } = useQuery(['users', userId], () => getUser(userId))

  if (!user) {
    return null
  }

  return (
    <div
      onClick={onClose}
      className="backdrop-blur-sm fixed top-0 left-0 z-50 w-full h-screen bg-black bg-opacity-50 grid place-items-center"
    >
      <div onClick={stopPropagation()} className="bg-white rounded-lg">
        {user.backgroundImage ? (
          <></>
        ) : (
          <div className="h-20 bg-blue-600 rounded-t-lg"></div>
        )}
        <div className="flex flex-col px-8 pb-8 -mt-6">
          <div className="mb-4 flex items-end gap-4">
            <img
              src={resolveStatic(user.profileImage)}
              alt={user.username}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-4xl font-bold tracking-tighter">
                @{user.username}
              </h1>
              <p>{user.name}</p>
            </div>
          </div>
          {!user.bio && (
            <p className="mb-4 text-center italic">
              "{user.bio || 'Veins filled with gold so I can feel you too'}"
            </p>
          )}
          <div className="mb-4 flex gap-2 items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
            <span className="text-sm">
              Entrou em: {formatDate(user.createdAt)}
            </span>
          </div>
          <Link
            className="py-2 px-4 text-center text-white bg-blue-600 rounded"
            to={`/app/users/${user.id}`}
          >
            Visitar perfil
          </Link>
        </div>
      </div>
    </div>
  )
}
