import { signUp } from '@/services/http/auth'
import { truncate } from '@/utils/strings'
import { preventDefault } from '@/utils/ui'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleSignUp = () => {
    if (!formRef.current) return
    if (!file) return

    const formData = new FormData(formRef.current)

    signUp({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      profileImage: file,
      birthDate: new Date(formData.get('birthDate') as string),
    }).then(() => navigate('/'))
  }

  return (
    <div className="bg-zinc-300 w-full h-screen grid place-items-center">
      <div className="py-16 px-16 rounded-lg bg-white w-full max-w-[32rem]">
        <h1 className="mb-8 text-4xl font-bold tracking-tighter">
          Criar sua conta
        </h1>
        <form
          ref={formRef}
          onSubmit={preventDefault(handleSignUp)}
          className="flex flex-col gap-4"
        >
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nome"
            className="border py-2 px-4 rounded outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-zinc-900"
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            className="border py-2 px-4 rounded outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-zinc-900"
          />
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Usuário"
            className="border py-2 px-4 rounded outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-zinc-900"
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            className="border py-2 px-4 rounded outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-zinc-900"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed py-2 px-4 text-center text-gray-600 rounded cursor-pointer"
          >
            {file ? (
              <p className="cursor-pointer">
                {truncate(file.name, { length: 16, omission: '...' })}
              </p>
            ) : (
              <p className="cursor-pointer">Selecione uma imagem de perfil</p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              id="profileImage"
              name="profileImage"
              className="hidden"
              accept="image/jpg,image/jpeg,image/png"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </div>
          <div className="mb-4">
            <p className="tracking-tight">
              <b>Data de nascimento</b>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Essa informação não será exibida publicamente, é apenas para
              confirmar sua identidade.
            </p>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              className="w-full py-2 px-4 border rounded outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <button className="text-white py-2 px-4 rounded-full bg-zinc-900 transition ease-in-out hover:bg-black">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
