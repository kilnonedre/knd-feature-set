import { fetchWithInterceptor } from '../middleware'
import { getToken, formatUrl, isFormData } from './utils'

export const Get = (url: string, params?: object, config?: object) => {
  let suffix = ''
  if (params) {
    const values = Object.values(params)
    Object.keys(params).forEach((key, index) => {
      suffix = `${suffix}&${key}=${values[index]}`
    })
    suffix = `?${suffix.slice(1)}`
  }
  url = formatUrl(url)
  return fetchWithInterceptor(`${url}${suffix}`, {
    method: 'GET',
    ...getToken(),
    ...config,
  })
}

export const Post = (url: string, params?: object, config?: object) => {
  const body = (isFormData(params) ? params : JSON.stringify(params)) as
    | FormData
    | string
  url = formatUrl(url)
  return fetchWithInterceptor(url, {
    method: 'POST',
    body,
    ...getToken(),
    ...config,
  })
}

export const Put = (url: string, params?: object, config?: object) => {
  const body = (isFormData(params) ? params : JSON.stringify(params)) as
    | FormData
    | string
  url = formatUrl(url)
  return fetchWithInterceptor(url, {
    method: 'PUT',
    body,
    ...getToken(),
    ...config,
  })
}

export const Delete = (url: string, params?: object, config?: object) => {
  url = formatUrl(url)
  return fetchWithInterceptor(url, {
    method: 'DELETE',
    body: JSON.stringify(params),
    ...getToken(),
    ...config,
  })
}
