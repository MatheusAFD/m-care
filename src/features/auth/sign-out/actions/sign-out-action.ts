'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signOut = async () => {
  const cookieStore = await cookies()

  cookieStore.delete('mcare-token')
  cookieStore.delete('mcare-refresh-token')

  redirect('/auth/sign-in')
}
