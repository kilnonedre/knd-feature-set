import mysql from 'mysql2/promise'
import { poolMsg } from '@/config/database'

const pool = mysql.createPool({
  ...poolMsg,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

export default pool
