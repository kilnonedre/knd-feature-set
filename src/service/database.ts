import { Get, Post } from '@/net/request'

// 检测数据库是否完善
export const CheckDatabase = () => Get('/databases')

// 创建数据库
export const CreateDatabase = () => Post('/databases')
