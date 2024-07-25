import { redirect } from 'next/navigation'

import { getUser } from '@/lib/supabase/server'

export default async function Home() {
  const user = await getUser()
  if (user) {
    redirect('/manage/profile')
  } else {
    redirect('/login')
  }
}
