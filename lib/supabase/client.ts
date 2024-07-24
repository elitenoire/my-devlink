import { createBrowserClient } from '@supabase/ssr'

/**
 *
 * @description Access Supabase from Client Components
 * which run in the browser.
 * @returns Supabase Browser client
 */

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
