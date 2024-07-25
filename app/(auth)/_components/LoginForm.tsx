'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import * as z from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/common/FormInput'

import { signIn } from '@/app/(auth)/actions'

import { cn } from '@/lib/utils'

import EnvelopeIcon from '@/public/icons/envelope.svg'
import LockIcon from '@/public/icons/lock.svg'

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Can't be empty" }).email('Email is invalid'),
  password: z.string().min(8, { message: 'Please check again' }),
})

export function LoginForm() {
  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    startTransition(async () => {
      try {
        const { success, message } = await signIn(values)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
          label="Password"
          type="password"
          placeholder="Enter your password"
          startIcon={LockIcon}
          disabled={isPending}
        />
        <div className="pt-4">
          <Button disabled={isPending} type="submit" className="w-full">
            Login
            <Loader2 className={cn('ml-2 h-5 w-5 animate-spin', { hidden: !isPending })} />
          </Button>
        </div>
        <p className="text-center">
          Dont&apos;t have an account?{' '}
          <Link href="/register" className="text-primary transition-colors hover:text-primary/80">
            Create account
          </Link>
        </p>
      </form>
    </Form>
  )
}
