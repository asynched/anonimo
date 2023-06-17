import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { timeSince } from '@/utils/dates'
import { resolveStatic } from '@/utils/files'

import {
  ChatBubbleLeftIcon,
  HeartIcon,
  BookmarkIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import MenuBar from '@/components/MenuBar'
import { createPost, deletePost, getPosts } from '@/services/http/posts'
import { useRef, useState } from 'react'
import { preventDefault } from '@/utils/ui'
import UserModal from '@/components/modals/UserModal'

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState)

  const toggle = () => setState((state) => !state)

  return [state, toggle] as const
}

export default function AppRoot() {
  const user = useAuth()
  const queryClient = useQueryClient()
  const formRef = useRef<HTMLFormElement>(null)
  const [modalUserId, setModalUserId] = useState<string | null>(null)
  const [showUserModal, toggleUserModal] = useToggle(false)
  const { data: posts } = useQuery(['posts'], () => getPosts(1), {
    initialData: [],
  })

  const handleCreatePost = () => {
    if (!formRef.current) return

    const formData = new FormData(formRef.current)

    createPost({
      content: formData.get('content') as string,
    })
      .then(() => formRef.current?.reset())
      .then(() => queryClient.invalidateQueries(['posts']))
  }

  const handleDeletePost = (postId: string) => {
    deletePost(postId).then(() => queryClient.invalidateQueries(['posts']))
  }

  return (
    <div className="max-w-screen-xl mx-auto flex min-h-screen">
      {showUserModal && modalUserId && (
        <UserModal userId={modalUserId} onClose={toggleUserModal} />
      )}
      <MenuBar user={user} />
      <main className="px-8 py-4 flex-1 max-h-screen overflow-auto">
        <h1 className="mb-4 text-2xl font-bold tracking-tighter">
          Página inicial
        </h1>
        <form
          ref={formRef}
          onSubmit={preventDefault(handleCreatePost)}
          className="mb-4 border-b border-gray-200 flex"
        >
          <div>
            <img
              src={resolveStatic(user.profileImage)}
              alt={user.username}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <textarea
              name="content"
              placeholder="O que está acontecendo?"
              className="py-2 px-4 w-full resize-none outline-none"
              rows={2}
            />
            <button className="mb-4 text-sm py-2 px-4 bg-blue-500 text-white ml-auto rounded-full">
              Publicar
            </button>
          </div>
        </form>
        <ul className="grid gap-4">
          {posts.map((post) => (
            <li className="flex gap-4 border-b pb-4" key={post.id}>
              <img
                src={resolveStatic(post.author.profileImage)}
                alt={post.author.username}
                className="w-10 h-10 rounded-full"
                onClick={() => {
                  setModalUserId(post.author.id)
                  toggleUserModal()
                }}
              />
              <div className="w-full">
                <div className="mb-1 flex items-center gap-1">
                  <span className="font-medium tracking-tight">
                    {post.author.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    @{post.author.username}
                  </span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500 text-sm">
                    {timeSince(post.createdAt)}
                  </span>
                </div>
                <p className="mb-4">{post.content}</p>
                <div className="grid grid-cols-4">
                  <div className="flex gap-1 text-gray-500">
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </div>
                  <div className="flex gap-1 text-gray-500">
                    <HeartIcon className="w-5 h-5" />
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <button>
                    <BookmarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                  {user.id === post.author.id && (
                    <button onClick={() => handleDeletePost(post.id)}>
                      <TrashIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <nav className="p-4 w-72 border-l hidden lg:block">
        <h1>Sei lá porra</h1>
      </nav>
    </div>
  )
}
