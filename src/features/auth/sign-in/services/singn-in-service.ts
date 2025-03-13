'use server'

import { cookies } from 'next/headers'

import { httpClientFetch } from '@m-care/features/@shared/lib'
import { SigninFormData } from '../components/SigninForm'

interface SigninResponse {
  accessToken: string
  refreshToken: string
}

export const signIn = async (data: SigninFormData) => {
  const [error, response] = await httpClientFetch<SigninResponse>({
    method: 'POST',
    url: '/auth/sign-in',
    data: {
      email: data.email,
      password: data.password
    }
  })

  if (error) {
    return [error, null]
  }

  const cookiesService = await cookies()

  const TWO_HOURS_IN_SECONDS = 7200

  cookiesService.set({
    name: 'mcare-token',
    value: response!.accessToken,
    httpOnly: true,
    secure: true,
    maxAge: TWO_HOURS_IN_SECONDS
  })

  cookiesService.set({
    name: 'mcare-refresh-token',
    value: response!.refreshToken,
    httpOnly: true,
    secure: true,
    maxAge: TWO_HOURS_IN_SECONDS
  })

  return [null, response]
}
