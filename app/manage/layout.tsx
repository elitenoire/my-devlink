import type { ReactNode } from 'react'

import Link from 'next/link'
import { TabLink } from '@/components/common/TabLink'
import { Button } from '@/components/ui/button'

import LogoSVG from '@/public/logo.svg'
import LogonameSVG from '@/public/logoname.svg'
import UserIcon from '@/public/icons/user.svg'
import LinkIcon from '@/public/icons/link.svg'
import EyeIcon from '@/public/icons/eye.svg'

type ManageLayoutProps = {
  preview: ReactNode
  forms: ReactNode
  children: ReactNode
}

export default function ManageLayout({ preview, forms, children }: ManageLayoutProps) {
  return (
    <div className="container flex flex-grow flex-col">
      <header className="md:p-6">
        <nav className="flex items-center justify-between rounded-xl bg-surface py-4 pl-6 pr-4">
          <div className="flex items-center gap-1">
            <LogoSVG className="w-8" />
            <LogonameSVG className="max-md:hidden" />
          </div>
          <div className="flex gap-4">
            <TabLink href="/manage/links" slug="links" label="Links" slot="forms">
              <LinkIcon className="size-5" />
            </TabLink>
            <TabLink href="/manage/profile" slug="profile" label="Profile Details" slot="forms">
              <UserIcon className="size-5" />
            </TabLink>
          </div>
          <div>
            <Button variant="secondary" asChild>
              <Link href="#">
                <EyeIcon className="size-5 md:hidden" />
                <span className="max-md:sr-only">Preview</span>
              </Link>
            </Button>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 gap-6 max-md:p-4 md:px-6 md:pb-6">
        <div className="flex flex-[7] rounded-xl bg-surface px-6 py-[101.5px] max-lg:hidden">
          {preview}
        </div>
        <div className="flex-[10] overflow-hidden rounded-xl bg-surface">{forms}</div>
      </main>
      {children}
    </div>
  )
}
