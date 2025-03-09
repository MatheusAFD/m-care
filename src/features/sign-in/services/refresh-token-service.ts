'use server'

import { env } from '@m-care/env'

interface SigninResponse {
  accessToken: string
  refreshToken: string
}

export const refreshToken = async () => {
  'use server'

  const { cookies } = await import('next/headers')

  const cookieStore = await cookies()
  const refreshTokenValue = cookieStore.get('mcare-refresh-token')?.value

  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken: refreshTokenValue })
    }
  )

  if (!response.ok) {
    return [await response.json(), null]
  }

  const data: SigninResponse = await response.json()

  return [null, data]
}
