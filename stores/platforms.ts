import { createStore } from 'zustand/vanilla'
import { createSelectorHooks } from 'auto-zustand-selectors-hook'
import { platformType } from '@/lib/schema'

export type IPlatform = {
  id: string
  code: (typeof platformType)[number]
  title: string
  logoUrl: string
  slug: string
  brandBg: string
  brandColor: string
}

export type PlatformsState = {
  platforms: IPlatform[]
}

export type PlatformsActions = {
  setPlatforms: (platorms: IPlatform[]) => void
}

export type PlatformsStore = PlatformsState & PlatformsActions

export const defaultInitState: PlatformsState = {
  platforms: [],
}

export const createPlatformsStore = (initState: PlatformsState = defaultInitState) => {
  return createStore<PlatformsStore>()((set) => ({
    ...initState,
    setPlatforms: (platforms: IPlatform[]) => set((state) => ({ ...state.platforms, platforms })),
  }))
}

export const usePlatformsStore = createSelectorHooks(createPlatformsStore())
