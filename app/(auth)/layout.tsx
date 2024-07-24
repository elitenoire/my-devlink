import type { PropsWithChildren } from 'react'

import LogoSVG from '@/public/logo.svg'
import LogonameSVG from '@/public/logoname.svg'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="max-md:bg-surface flex flex-grow md:items-center md:justify-center">
      <div className="mx-auto w-full max-w-[476px] space-y-16 py-8 max-md:px-8 md:space-y-[51px]">
        <header className="flex items-center gap-1 md:justify-center">
          <LogoSVG className="w-10" />
          <LogonameSVG />
        </header>
        <main className="bg-surface rounded-xl md:p-10">{children}</main>
      </div>
    </div>
  )
}
