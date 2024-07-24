import * as React from 'react'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>
  endIcon?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon
    const EndIcon = endIcon
    return (
      <div className="relative w-full">
        {StartIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
            <StartIcon className="size-4 text-foreground" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-lg border border-input bg-surface px-4 py-3 text-foreground-dark file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-dark/50 focus-visible:border-primary focus-visible:shadow-active focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            startIcon ? 'pl-11' : '',
            endIcon ? 'pr-8' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            <EndIcon className="size-4 text-foreground" />
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
