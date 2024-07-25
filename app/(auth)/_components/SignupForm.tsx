'use client'

import type { AuthTokenResponse } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import * as z from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole, Loader2 } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/common/FormInput'

import { signUp } from '@/app/(auth)/actions'

import { cn } from '@/lib/utils'

import EnvelopeIcon from '@/public/icons/envelope.svg'
import LockIcon from '@/public/icons/lock.svg'

export const signupFormSchema = z
  .object({
    email: z.string().min(1, { message: "Can't be empty" }).email('Email is invalid'),
    password: z.string().min(8, { message: 'Please check again' }),
    confirmPassword: z.string().min(8, { message: 'Please check again' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export function SignupForm() {
  const [isPending, startTransition] = useTransition()
  const { replace } = useRouter()

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof signupFormSchema>) => {
    startTransition(async () => {
      try {
        const { success, message } = await signUp(values)
        if (success) {
          replace('/manage/profile')
        }
        if (message) {
          toast.error(message)
        }
      } catch (e) {
        console.error(e)
        toast.error('Something went wrong')
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          name="email"
          control={form.control}
          label="Email address"
          type="email"
          placeholder="e.g. alex@email.com"
          startIcon={EnvelopeIcon}
          disabled={isPending}
        />
        <FormInput
          name="password"
          control={form.control}
          label="Create password"
          type="password"
          placeholder="At least 8 characters"
          startIcon={LockIcon}
          disabled={isPending}
        />
        <FormInput
          name="confirmPassword"
          control={form.control}
          label="Confirm password"
          type="password"
          placeholder="At least 8 characters"
          description="Password must contain at least 8 characters"
          startIcon={LockIcon}
          disabled={isPending}
        />
        <div className="">
          <Button disabled={isPending} type="submit" className="w-full">
            <span className="truncate">Create new account</span>
            <Loader2 className={cn('ml-2 h-5 w-5 animate-spin', { hidden: !isPending })} />
          </Button>
        </div>
        <p className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-primary transition-colors hover:text-primary/80">
            Login
          </Link>
        </p>
      </form>
    </Form>
  )
}
