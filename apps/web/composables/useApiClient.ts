import { defu } from 'defu'
import { UseFetchOptions } from 'nuxt/app'

/**
 * ## useApiConnection
 *
 * connect to api backend that already configured the access token
 * from the user cookie
 *
 * @param url the url path to access within the url
 * @param options the fetching options
 * @param method method use to fetching the data. Between `default` or `lazy`
 * @returns
 */
function useApiClient<T extends any>(
  url: string,
  options: UseFetchOptions<T> = {},
  method: 'default' | 'lazy' = 'default'
) {
  const accessToken = useCookie('accessToken').value
  const config = useRuntimeConfig()

  // specify the defaults config
  // for the fetching
  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl,
    key: url,
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`
        }
      : {}
  }

  // merge the options and tidy until deep nice
  const params = defu(defaults, options)

  // switch method to use
  // between fetch and lazyFetch
  if (method == 'lazy') {
    return useLazyFetch(url, params)
  }

  return useFetch(url, params)
}

export default useApiClient
