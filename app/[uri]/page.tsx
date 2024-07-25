import { PreviewBar } from '@/app/[uri]/_components/PreviewBar'
import { ProfileLinksPreview } from '@/components/common/ProfileLinksPreview'

export default function PreviewProfile({ params: { uri } }: { params: { uri: string } }) {
  return (
    <>
      <header className="md:h-[357px] md:rounded-b-[32px] md:bg-primary">
        <PreviewBar uri={uri} />
      </header>
      <main className="flex-1 max-md:pt-[60px]">
        <div className="md:shadow-subtle relative rounded-3xl bg-surface md:-top-32 md:px-12 md:py-14">
          <ProfileLinksPreview mode="view" />
        </div>
      </main>
    </>
  )
}
