'use client'

import { NextUIProvider } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import { setRouter } from '@/net/middleware'
import type types from './layoutType.d'

const Layout = ({ children }: types.ConfigProp) => {
  const router = useRouter()

  setRouter(router)

  const pathname = usePathname()

  const noVerifyPageList = ['/login']

  useEffect(() => {
    const index = noVerifyPageList.indexOf(pathname)
    if (index === -1 && !localStorage.getItem('KND_TOKEN')) {
      toast.error('Token 不存在，请重新登录')
      router.push('/login')
    }
  }, [pathname])

  return (
    <>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </>
  )
}

export default Layout
