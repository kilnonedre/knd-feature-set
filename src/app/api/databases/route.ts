import { SpliceDatabase } from '@/config/database'
import { poolMsg } from '@/config/database'
import { response } from '@/util/backend'
import pool from '@/util/mysql'
import { tryCatch } from '@/util/universal'
import type types from './databaseType.d'

const getFun = async () => {
  const sql = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${poolMsg.database}'`
  const [results] = (await pool.query(sql)) as unknown as [
    Array<types.ConfigTable>,
  ]
  const format = results.map(item => item.TABLE_NAME)
  const isSame = SpliceDatabase().length === format.length
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
    SpliceDatabase().map(table => {
      const declare: Array<string> = []

      table.fieldList.map(field => {
        const isPrimaryKey = field.name === table.primaryKey
        declare.push(
          `${field.name} ${field.type} ${
            isPrimaryKey ? 'PRIMARY KEY AUTO_INCREMENT' : ''
          } COMMENT '${field.comment}'`
        )
      })
      const sql = `CREATE TABLE IF NOT EXISTS ${table.name} (${declare.join(
        ','
      )}) COMMENT = '${table.comment}'`
      return pool.query(sql)
    })
  )
  return true
}

export const POST = async () => {
  const { isSuccess, data, error } = await tryCatch(postFun)
  if (isSuccess) return response(200, 200, data, '数据库创建成功')
  return response(200, 400, false, error.message)
}
