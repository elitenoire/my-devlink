import { createStore } from 'zustand/vanilla'
import { createSelectorHooks } from 'auto-zustand-selectors-hook'

export type ProfileState = {
  uri: string
  firstname: string
  lastname: string
  email: string
  avatar: string
}

export type ProfileActions = {
  setUri: (uri: string) => void
  setFirstname: (firstname: string) => void
  setLastname: (lastname: string) => void
  setEmail: (email: string) => void
  setAvatar: (avatar: string) => void
  setProfile: (profile: ProfileState) => void
}

export type ProfileStore = ProfileState & ProfileActions

export const defaultInitState: ProfileState = {
  uri: '',
  firstname: '',
  lastname: '',
  email: '',
  avatar: '',
}

export const createProfileStore = (initState: ProfileState = defaultInitState) => {
  return createStore<ProfileStore>()((set) => ({
    ...initState,
    setUri: (uri: string) => set({ uri }),
    setFirstname: (firstname: string) => set({ firstname }),
    setLastname: (lastname: string) => set({ lastname }),
    setEmail: (email: string) => set({ email }),
    setAvatar: (avatar: string) => set({ avatar }),
    setProfile: (profile: ProfileState) => set({ ...profile }),
  }))
}

export const useProfileStore = createSelectorHooks(createProfileStore())
