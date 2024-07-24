'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { loginFormSchema } from '@/app/(auth)/_components/LoginForm'
import { signupFormSchema } from '@/app/(auth)/_components/SignupForm'

export async function signIn(values: z.infer<typeof loginFormSchema>) {
  const supabase = createClient()

  const { email, password } = values

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return {
    success: true,
    message: null,
  }
}

export async function signUp(values: z.infer<typeof signupFormSchema>) {
  const supabase = createClient()

  const { email, password } = values

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return {
    success: true,
    message: null,
  }
}
