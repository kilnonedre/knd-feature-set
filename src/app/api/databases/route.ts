import { response } from '@/util/backend'
import { tryCatch } from '@/util/universal'
import type types from './databaseType.d'
import databaseList from '@/config/database/index.json'
import pool from '@/util/mysql'

const getFun = async () => {
  const sql = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = "knd_tool"`
  const [results] = await pool.query(sql)
  const format = (results as Array<types.ConfigTable>).map(
    item => item.TABLE_NAME
  )
  const isSame = databaseList.length === format.length
  return isSame
}

export const GET = async () => {
  const { isSuccess, data, error } = await tryCatch(getFun)
  if (isSuccess)
    return response(200, 200, data, `${data ? '不' : ''}需要对表进行修改`)
  return response(200, 400, false, error.message)
}

const postFun = async () => {
  await Promise.all(
    databaseList.map(table => {
      const declare: Array<string> = []
      for (const key in table.data) {
        const isPrimaryKey = key === table.primaryKey
        declare.push(
          `${key} ${table.data[key as keyof typeof table.data]} ${
            isPrimaryKey ? 'PRIMARY KEY AUTO_INCREMENT' : ''
          }`
        )
      }
      const sql = `CREATE TABLE IF NOT EXISTS ${table.name} (${declare.join(
        ','
      )})`
      return pool.query(sql)
    })
  )
  return true
}

export const POST = async () => {
  const { isSuccess, error } = await tryCatch(postFun)
  if (isSuccess) return response(200, 200, true)
  return response(200, 400, false, error.message)
}
