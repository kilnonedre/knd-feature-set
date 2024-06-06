import { isValidURL } from '@/util/universal/regularExpression'
import { API_URL } from '@/env'

export const isFormData = (object: object | undefined) => {
  if (Object.prototype.toString.call(object) !== '[object FormData]')
    return false
  return true
}

export const getToken = () => {
  const token = localStorage.getItem('KND_TOKEN')
  if (token) return { headers: { Authorization: `Bearer ${token}` } }
  return {}
}

export const formatUrl = (string: string) => {
  const isUrl = isValidURL(string)
  if (isUrl) {
    return string
  }
  return `${API_URL}/api${string}`
}
