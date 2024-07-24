import type { PropsWithChildren } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

type FormCardProps = {
  title: string
  description: string
  pending?: boolean
  disabled?: boolean
  actionLabel?: string
}

export function FormCard({
  title,
  description,
  pending,
  disabled,
  actionLabel = 'Save',
  children,
}: PropsWithChildren<FormCardProps>) {
  return (
    <div>
      <div className="space-y-10 p-6 md:p-10">
        <div>
          <h1 className="heading-m">{title}</h1>
          <p className="text-body">{description}</p>
        </div>
        {children}
      </div>
      <div className="flex items-center border-t p-4 md:justify-end md:px-10 md:py-6">
        <Button disabled={pending || disabled} type="submit" className="max-md:w-full">
          {actionLabel}
          <Loader2 className={cn('ml-2 h-5 w-5 animate-spin', { hidden: !pending })} />
        </Button>
      </div>
    </div>
  )
}
