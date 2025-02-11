'use server'

import { cookies } from 'next/headers'

import { httpClientFetch } from '@m-care/features/@shared/lib'
import { SigninFormData } from '../components/SigninForm'

interface SigninResponse {
  accessToken: string
}

export const signin = async (data: SigninFormData) => {
  const [error, response] = await httpClientFetch<SigninResponse>({
    method: 'POST',
    url: '/auth/signin',
    data: {
      email: data.email,
      password: data.password
    }
  })

  if (error) {
    return [error, null]
  }

  const cookiesService = await cookies()

  cookiesService.set({
    name: 'mcare-token',
    value: response!.accessToken,
    httpOnly: true,
    secure: true
  })

  return [null, response]
}
