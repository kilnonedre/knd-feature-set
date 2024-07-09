'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Loading from '@/component/loading'

const Index = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  })

  return <Loading />
}

export default Index
