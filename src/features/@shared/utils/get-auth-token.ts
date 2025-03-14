'use server'

import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export const getAuthToken = async () => {
  const cookieService = await cookies()

  const token = cookieService.get('mcare-token')
  const refreshToken = cookieService.get('mcare-refresh-token')

  const decodedToken = token && jwtDecode(token?.value ?? '')

  const tokenHasExpired =
    decodedToken?.exp && Math.floor(Date.now() / 1000) >= decodedToken.exp

  return { token, tokenHasExpired, refreshToken }
}
