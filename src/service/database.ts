import { Get, Post } from '@/net/request'

export const CheckDatabase = () => Get('/databases')

export const CreateDatabase = () => Post('/databases')
