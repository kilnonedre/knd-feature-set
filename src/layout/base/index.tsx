'use client'

import { NextUIProvider } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import { setRouter } from '@/net/middleware'
import Header from './component/header'
import Menu from './component/menu'
import type types from './baseLayoutType'
import styles from './baseLayoutStyle.module.scss'

const BaseLayout = ({ children }: types.ConfigProp) => {
  const router = useRouter()

  setRouter(router)

  const pathname = usePathname()

  const noVerifyPageList = ['/login']

  const noLayout = ['/', '/login', '/base']

  const noMenu = ['']

  useEffect(() => {
    const index = noVerifyPageList.indexOf(pathname)
    if (index === -1 && !localStorage.getItem('KND_TOKEN')) {
      toast.error('Token 不存在，请重新登录')
      router.push('/login')
    }
  }, [pathname])

  return (
    <>
      <NextUIProvider>
        <div className={styles['base']}>
          {!noLayout.includes(pathname) && <Header />}
          {!noMenu.includes(pathname) && <Menu />}
          <div className={styles['base-body']}>{children}</div>
        </div>
      </NextUIProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </>
  )
}

export default BaseLayout
