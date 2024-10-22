declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGSVGElement>>
  export default content
}
/** svg imports with a ?url suffix can be used as the src value in Image components */
declare module '*.svg?url' {
  import { StaticImport } from 'next/image'

  const content: StaticImport | string
  export default content
}
