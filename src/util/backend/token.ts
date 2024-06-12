import * as jose from 'jose'
import { TOKEN_AUDIENCE, TOKEN_ISSUER, TOKEN_SECRET, TOKEN_VALID } from '@/env'

const secret = jose.base64url.decode(TOKEN_SECRET)

export const createToken = async (params: object) => {
  const jwt = await new jose.EncryptJWT({ ...params })
    // 设置 JWT 的 JWE Protected Header，指定加密算法和解密算法 alg: 算法 enc: 加密
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    // 设置 JWT 的签发时间（Issued At），默认为当前时间
    .setIssuedAt()
    // 设置 JWT 的签发者（Issuer）
    .setIssuer(TOKEN_ISSUER)
    // 设置 JWT 的接收者（Audience）
    .setAudience(TOKEN_AUDIENCE)
    // 设置 JWT 的过期时间，此处为2小时后过期
    .setExpirationTime(TOKEN_VALID)
    // 使用密钥对 JWT 进行加密
    .encrypt(secret)
  return jwt
}

export const verifyToken = async (authorization: string) => {
  if (!authorization || !authorization.includes('Bearer '))
    throw new Error('Token 不合法')
  const token = authorization.substring('Bearer '.length, authorization.length)
  const { payload } = await jose.jwtDecrypt(token, secret, {
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
  })
  return payload
}
