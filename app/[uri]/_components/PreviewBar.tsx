import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PreviewShare } from '@/app/[uri]/_components/PreviewShare'

type PreviewBarProps = {
  uri: string
}

export function PreviewBar({ uri }: PreviewBarProps) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-4 pb-6 pt-4 md:m-6">
      <Button variant="secondary" asChild>
        <Link href="/manage/links">Back to Editor</Link>
      </Button>
      <PreviewShare uri={uri} />
    </nav>
  )
}
