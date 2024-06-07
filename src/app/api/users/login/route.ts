import { NextRequest } from 'next/server'
import type { ConfigBaseUser } from '@/config/database/databaseType.d'
import { response } from '@/util/backend'
import pool from '@/util/mysql'
import { tryCatch } from '@/util/universal'
import type types from './loginType.d'

const postFun = async ({ email, password }: types.ConfigPostParams) => {
  const sql = 'SELECT * FROM base_users WHERE email = ?'
  const [userList] = (await pool.query(sql, [email])) as unknown as [
    Array<ConfigBaseUser>,
  ]
  if (userList.length === 0) throw new Error('用户不存在')
  if (userList[0].password !== password) throw new Error('密码错误')
  return true
}

export const POST = async (request: NextRequest) => {
  const req = await request.json()
  const { isSuccess, data, error } = await tryCatch(postFun, req)
  if (isSuccess) return response(200, 200, data)
  return response(200, 400, false, error.message)
}
