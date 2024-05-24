'use client'

import React from 'react'
import type types from './layoutType.d'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'

const Layout = ({ children }: types.ConfigProp) => {
  return (
    <>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </>
  )
}

export default Layout
