import { createStore } from 'zustand/vanilla'
import { createSelectorHooks } from 'auto-zustand-selectors-hook'

import type { ILink } from '@/lib/schema'

export type LinksState = {
  links: ILink[]
}

export type LinksActions = {
  setLinks: (links: ILink[]) => void
}

export type LinksStore = LinksState & LinksActions

export const defaultInitState: LinksState = {
  links: [],
}

export const createLinksStore = (initState: LinksState = defaultInitState) => {
  return createStore<LinksStore>()((set) => ({
    ...initState,
    setLinks: (links: ILink[]) => set((state) => ({ ...state.links, links })),
  }))
}

export const useLinksStore = createSelectorHooks(createLinksStore())
