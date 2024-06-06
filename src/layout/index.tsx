'use client'

import React from 'react'
import type types from './layoutType.d'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'
import { setRouter } from '@/net/middleware'
import { useRouter } from 'next/navigation'

const Layout = ({ children }: types.ConfigProp) => {
  const router = useRouter()

  setRouter(router)

  return (
    <>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </>
  )
}

export default Layout
