import type loginTypes from '@/app/api/users/login/loginType.d'
import type registerTypes from '@/app/api/users/register/registerType.d'
import { Post } from '@/net/request'

export const Register = (params: registerTypes.ConfigPostParams) =>
  Post('/users/register', params)

export const Login = (params: loginTypes.ConfigPostParams) =>
  Post('/users/login', params)
