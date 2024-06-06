'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Index = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  })

  return <div>index</div>
}

export default Index
