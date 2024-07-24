import type { Metadata } from 'next'
import { SignupForm } from '@/app/(auth)/_components/SignupForm'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create an account on Devlinks to start sharing your links!',
}

export default function Register() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="heading-m">Create account</h1>
        <p>Let&apos;s get you started sharing your links!</p>
      </div>
      <SignupForm />
    </div>
  )
}
