'use server'

import { cookies } from 'next/headers'

export const getAuthToken = async () => {
  const cookieService = await cookies()

  return cookieService.get('mcare-token')
}
