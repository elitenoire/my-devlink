import { ProfileLinksPreview } from '@/components/common/ProfileLinksPreview'
import DeviceFrame from '@/public/icons/device.svg'

export default function Preview() {
  return (
    <div className="relative mx-auto h-[631px] w-[307px]">
      <div className="absolute inset-0">
        <DeviceFrame className="w-full" />
      </div>
      <div className="hidden-scroll z-1 relative h-[calc(100%-2rem)] overflow-y-auto px-[24px] py-[53.5px]">
        <ProfileLinksPreview mode="edit" />
      </div>
    </div>
  )
}
