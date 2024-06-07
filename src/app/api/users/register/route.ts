import { NextRequest } from 'next/server'
import type { ConfigBaseUser } from '@/config/database/databaseType.d'
import { dataNow, response } from '@/util/backend'
import pool from '@/util/mysql'
import { tryCatch } from '@/util/universal'
import type types from './registerType.d'

const postFun = async ({ email, password }: types.ConfigPostParams) => {
  let sql = 'SELECT * FROM base_users WHERE email = ?'
  const [userList] = (await pool.query(sql, [email])) as unknown as [
    Array<ConfigBaseUser>,
  ]
  if (userList.length > 0) throw new Error('用户名重复')
  sql =
    'INSERT INTO base_users (nickname, email, password, avatar, create_time, update_time) VALUES ?'
  const data = dataNow()
  await pool.query(sql, [
    [
      [
        '新用户',
        email,
        password,
        '/image/avatar/avatar_default.png',
        data,
        data,
      ],
    ],
  ])
  return true
}

export const POST = async (request: NextRequest) => {
  const req = await request.json()
  const { isSuccess, error } = await tryCatch(postFun, req)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, false, error.message)
}
