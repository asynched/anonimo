import { setAuthToken, signIn } from '@/services/http/auth'
import { saveToken } from '@/services/storage/auth'
import { preventDefault } from '@/utils/ui'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSignIn = () => {
    if (!formRef.current) return
    const form = formRef.current

    signIn({
      email: form.email.value,
      password: form.password.value,
    }).then((token) => {
      saveToken(token)
      setAuthToken(token)
      navigate('/app')
    })
  }

  return (
    <div className="bg-zinc-300 w-full h-screen grid place-items-center">
      <div className="py-32 px-24 rounded-lg bg-white w-full max-w-[32rem]">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tighter">
          Entrar no{' '}
          <span className="bg-gradient-to-br from-sky-500 to-blue-600 bg-clip-text text-transparent">
            Anônimo
          </span>
        </h1>
        <form
          ref={formRef}
          onSubmit={preventDefault(handleSignIn)}
          className="mb-8 flex flex-col gap-4"
        >
          <input
            name="email"
            id="email"
            placeholder="Digite o seu e-mail"
            type="email"
            className="border py-2 px-4 rounded outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-zinc-900"
          />
          <input
            name="password"
            id="password"
            placeholder="Digite sua senha"
            type="password"
            className="border py-2 px-4 rounded outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-zinc-900"
          />
          <button className="bg-zinc-900 text-white text-center py-2 rounded-full transition ease-in-out hover:bg-black">
            Avançar
          </button>
        </form>
        <hr className="mb-8" />
        <p className="text-center text-gray-600">
          Não tem uma conta?{' '}
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
