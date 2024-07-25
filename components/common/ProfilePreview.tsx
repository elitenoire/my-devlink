'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useProfileStore } from '@/stores/profile'

type ProfilePreviewProps = {
  mode?: 'edit' | 'view'
}

export function ProfilePreview({ mode = 'view' }: ProfilePreviewProps) {
  // const firstname = 'Ben'
  // const lastname = 'Wright'
  // const email = 'ben@example.com'
  // const avatar = 'hello.svg'

  const firstname = useProfileStore.useFirstname()
  const lastname = useProfileStore.useLastname()
  const email = useProfileStore.useEmail()
  const avatar = useProfileStore.useAvatar()

  const isView = mode === 'view'
  const NameTag = isView ? 'h1' : 'p'

  const name = `${firstname} ${lastname}`.trim()

  const hideName = isView && !name && !email
  const hideAvatar = isView && !avatar

  return (
    <div className="flex flex-col items-center gap-[25px]">
      {!hideAvatar && (
        <div className="size-24">
          {!!avatar && (
            <Avatar className="h-full w-full">
              <AvatarImage src={avatar} />
              <AvatarFallback>
                {name
                  ?.split(' ')
                  .map((w) => (w ? w[0].toUpperCase() : ''))
                  .join('')}
              </AvatarFallback>
            </Avatar>
          )}
          {!isView && !avatar && <span className="bg-blank block size-full rounded-full" />}
        </div>
      )}
      {!hideName && (
        <div className="space-y-2 text-center">
          {!!name && <NameTag className="heading-m">{name}</NameTag>}
          {!isView && !name && (
            <span className="bg-blank mx-auto block h-4 w-[160px] rounded-full" />
          )}
          {!!email && <p>{email}</p>}
          {!isView && !email && (
            <span className="bg-blank mx-auto block h-2 w-[72px] rounded-full" />
          )}
        </div>
      )}
    </div>
  )
}
