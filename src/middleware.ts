import { NextRequest } from 'next/server'
import { response } from './util/backend'
import { verifyToken } from './util/backend/token'
import { tryCatch } from './util/universal'

const noVerifyApiList = ['/users', '/databases']

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const authorization = request.headers.get('Authorization') as string
  if (pathname.startsWith('/api')) {
    let isNecessaryVerifyApi = true
    noVerifyApiList.map(noVerifyApi => {
      if (pathname.startsWith(`/api${noVerifyApi}`))
        isNecessaryVerifyApi = false
    })
    if (isNecessaryVerifyApi) {
      const { isSuccess, error } = await tryCatch(verifyToken, authorization)
      if (!isSuccess) return response(401, 401, false, error.message)
    }
  }
}
