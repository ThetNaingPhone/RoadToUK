// components/ProtectedLayout.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import Sidebar from '@/components/sider'

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      setIsAuth(true)
    }
  }, [pathname])

  if (!isAuth) return null

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
