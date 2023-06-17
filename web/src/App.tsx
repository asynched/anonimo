import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { withGuards } from '@/loaders/guards'
import { authGuard, publicOnlyGuard } from '@/loaders/auth.guard'

import Login from '@/pages/login'
import SignUp from '@/pages/sign-up'
import AppRoot from '@/pages/app'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    loader: withGuards({
      guards: [publicOnlyGuard],
      onGuardFail: '/app',
    }),
  },
  {
    path: '/sign-up',
    element: <SignUp />,
    loader: withGuards({
      guards: [publicOnlyGuard],
      onGuardFail: '/app',
    }),
  },
  {
    path: '/app',
    element: <AppRoot />,
    loader: withGuards({
      guards: [authGuard],
      onGuardFail: '/',
    }),
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
