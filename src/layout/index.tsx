'use client'

import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Toaster } from 'sonner'
import { setRouter } from '@/net/middleware'
import type types from './layoutType.d'

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
