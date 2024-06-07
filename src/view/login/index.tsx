'use client'

import { Button, Input } from '@nextui-org/react'
import React, { type CSSProperties, useEffect, useState } from 'react'
import { toast } from 'sonner'
import Checkbox from '@/component/checkbox'
import Loading from '@/component/loading'
import { CheckDatabase, CreateDatabase } from '@/service/database'
import { notYetDeveloped } from '@/util/frontend'
import { getRandomInt } from '@/util/universal'
import styles from './loginStyle.module.scss'

const bkList = [
  {
    id: 1,
    styles: {
      '--front-background-image': `url('/image/login/login-fir.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-fir-clip.jpg')`,
      '--front-color': '#000000',
    },
  },
  {
    id: 2,
    styles: {
      '--front-background-image': `url('/image/login/login-sec.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-sec-clip.jpg')`,
      '--front-color': '#573C8F',
    },
  },
  {
    id: 4,
    styles: {
      '--front-background-image': `url('/image/login/login-fou.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-fou-clip.jpg')`,
      '--front-color': '#d9badc',
    },
  },
  {
    id: 5,
    styles: {
      '--front-background-image': `url('/image/login/login-fif.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-fif-clip.jpg')`,
      '--front-color': '#b8b6c3',
    },
  },
]

const Login = () => {
  const [isNeedCreate, setIsNeedCreate] = useState(false)
  const [account, setAccount] = useState('')
  const [accountErrMsg, setAccountErrMsg] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErrMsg, setPasswordErrMsg] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [theme, setTheme] = useState({
    id: 1,
    styles: {
      '--front-background-image': `url('/image/login/login-fir.jpg')`,
      '--front-background-image-clip': `url('/image/login/login-fir-clip.jpg')`,
      '--front-color': '#000000',
    },
  })

  useEffect(() => {
    checkDatabase()
  }, [])

  const checkDatabase = async () => {
    const response = await CheckDatabase()
    const { code, data, msg } = await response.json()
    if (code !== 200) {
      return toast.error(msg)
    }
    setIsNeedCreate(!data)
    setPageLoading(false)
  }

  const updateAccount = (e: string) => {
    accountErrMsg && setAccountErrMsg('')
    setAccount(e)
  }

  const updatePassword = (e: string) => {
    passwordErrMsg && setPasswordErrMsg('')
    setPassword(e)
  }

  const updateTheme = () => {
    const bkListFilter = bkList.filter(bk => bk.id !== theme.id)
    const index = getRandomInt(0, bkListFilter.length - 1)
    setTheme(bkListFilter[index])
  }

  const login = () => {
    setLoginLoading(true)
    notYetDeveloped()
    setLoginLoading(false)
  }

  const register = () => {
    setRegisterLoading(true)
    notYetDeveloped()
    setRegisterLoading(false)
  }

  const createDatabase = async () => {
    setCreateLoading(true)
    const response = await CreateDatabase()
    const { code, msg } = await response.json()
    setCreateLoading(false)
    if (code !== 200) {
      return toast.error(msg)
    }
    toast.success(msg)
    setIsNeedCreate(false)
  }

  return (
    <div className={styles['login']} style={theme.styles as CSSProperties}>
      {pageLoading && <Loading />}
      <div className={styles['login-panel']}>
        <div className={styles['login-panel-bk']}></div>
        <div className={styles['login-panel-main']}>
          <div className={styles['form']}>
            <div className={styles['form-header']}>Welcome To Yume</div>
            <div className={styles['form-body']}>
              <form>
                <Input
                  className={styles['form-body-input']}
                  type="text"
                  size="sm"
                  radius="md"
                  placeholder="请输入账号"
                  autoComplete="off"
                  isClearable
                  isInvalid={!!accountErrMsg}
                  errorMessage={accountErrMsg}
                  value={account}
                  onValueChange={updateAccount}
                />
                <Input
                  className={styles['form-body-input']}
                  type="password"
                  size="sm"
                  radius="md"
                  placeholder="请输入密码"
                  autoComplete="off"
                  isClearable
                  isInvalid={!!passwordErrMsg}
                  errorMessage={passwordErrMsg}
                  value={password}
                  onValueChange={updatePassword}
                />
              </form>
            </div>
            <div className={styles['form-tip']}>
              <Checkbox
                text="记住账号"
                color={theme.styles['--front-color']}
                onChange={() => {
                  notYetDeveloped()
                }}
              />
              <p className={styles['form-tip-forget']} onClick={updateTheme}>
                忘记密码？
              </p>
            </div>
            <div className={styles['form-footer']}>
              {isNeedCreate ? (
                <Button
                  color="danger"
                  size="sm"
                  isLoading={createLoading}
                  onPress={createDatabase}
                >
                  创建数据库
                </Button>
              ) : (
                <>
                  <Button
                    className={styles['form-footer-login']}
                    color="primary"
                    size="sm"
                    isLoading={loginLoading}
                    onPress={login}
                  >
                    登录
                  </Button>
                  <Button
                    className={styles['form-footer-register']}
                    color="primary"
                    size="sm"
                    variant="bordered"
                    isLoading={registerLoading}
                    onPress={register}
                  >
                    注册
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
