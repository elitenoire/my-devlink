import NextImage from 'next/image'

import emptyUrl from '@/public/icons/empty.svg?url'

export function EmptyLinks() {
  return (
    <div className="rounded-xl bg-background p-5 md:py-20 lg:py-16">
      <div className="mx-auto flex w-full max-w-[488px] flex-col items-center gap-6 text-center md:gap-10">
        <div className="w-1/2">
          <NextImage src={emptyUrl} alt="" unoptimized />
        </div>
        <div className="space-y-6">
          <h2 className="heading-m">Let&apos;s get you started</h2>
          <p>
            Use the &quot;Add new link&quot; button to get started. Once you have more than one
            link, you can reorder and edit them. We&apos;re here to help you share your profiles
            with everyone!
          </p>
        </div>
      </div>
    </div>
  )
}
