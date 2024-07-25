import NextImage from 'next/image'
import Link from 'next/link'

import LinkIcon from '@/public/icons/link.svg'

export function ManageUnknown() {
  return (
    <div className="rounded-xl bg-background p-5 md:py-20 lg:py-16">
      <div className="mx-auto flex w-full max-w-[488px] flex-col items-center gap-6 text-center md:gap-10">
        <div className="w-1/2">
          <LinkIcon className="w-full" />
        </div>
        <div className="space-y-6">
          <h2 className="heading-m">Nothing to see here</h2>
          <p>
            This page is empty. You can{' '}
            <Link
              className="text-primary transition-colors hover:text-primary/80"
              href="/manage/links"
            >
              add
            </Link>
            ,{' '}
            <Link
              href="/manage/profile"
              className="text-primary transition-colors hover:text-primary/80"
            >
              edit
            </Link>{' '}
            or preview your links.
          </p>
        </div>
      </div>
    </div>
  )
}
