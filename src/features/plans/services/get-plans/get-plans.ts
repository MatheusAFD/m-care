import { httpClientFetch } from '@m-care/features/@shared/lib'
import { ResponseConfig } from '@m-care/features/@shared/lib/client-fetch'

import { Plan } from './get-plans-response'

export const getPlans = async (): Promise<ResponseConfig<Plan[]>> => {
  const [error, response] = await httpClientFetch<Plan[]>({
    method: 'GET',
    url: '/plans',
    cache: 'force-cache',
    next: {
      revalidate: 3600,
      tags: ['plans']
    }
  })

  if (error) {
    return [error, null]
  }

  return [null, response]
}
