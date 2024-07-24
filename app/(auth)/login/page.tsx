import type { Metadata } from 'next'
import { LoginForm } from '@/app/(auth)/_components/LoginForm'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to get back into Devlinks',
}

export default function Login() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="heading-m">Login</h1>
        <p>Add your details below to get back into the app</p>
      </div>
      <LoginForm />
    </div>
  )
}
