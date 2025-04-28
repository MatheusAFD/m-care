import { httpClientFetch } from '@m-care/features/@shared/lib'
import { ResponseConfig } from '@m-care/features/@shared/lib/client-fetch'

import { GetMeResponse } from './get-me-response'

export const getMe = async (): Promise<ResponseConfig<GetMeResponse>> => {
  const [error, response] = await httpClientFetch<GetMeResponse>({
    method: 'GET',
    url: '/users/get-me',
    cache: 'force-cache',
    next: {
      revalidate: 60 * 60,
      tags: ['get-me']
    }
  })

  if (error) {
    return [error, null]
  }

  return [null, response]
}
