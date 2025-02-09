export type RequestConfig<TData = unknown> = {
  baseURL?: string
  url?: string
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'
  params?: Record<string, unknown>
  data?: TData | FormData
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
  signal?: AbortSignal
  headers?: HeadersInit
}

export type ResponseConfig<TData = unknown, TError = unknown> =
  | [TError, null]
  | [null, TData]

export const httpClientFetch = async <
  TData,
  TError = unknown,
  TVariables = unknown
>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData, TError>> => {
  const response = await fetch(`${config.baseURL}${config.url}`, {
    method: config.method.toUpperCase(),
    body: config.data ? JSON.stringify(config.data) : undefined,
    signal: config.signal,
    headers: config.headers
  })

  const data = await response.json()

  if (!response.ok) {
    return [data as TError, null]
  }

  return [null, data as TData]
}
