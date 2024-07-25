import { ProfilePreview } from '@/components/common/ProfilePreview'
import { LinksPreview } from '@/components/common/LinksPreview'

type ProfileLinksPreviewProps = {
  mode: 'edit' | 'view'
}

export function ProfileLinksPreview({ mode }: ProfileLinksPreviewProps) {
  return (
    <div className="mx-auto w-[237px] space-y-14">
      <ProfilePreview mode={mode} />
      <LinksPreview mode={mode} />
    </div>
  )
}
