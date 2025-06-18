// app/layout.tsx
'use client'

import { useEffect, useState, type ReactNode } from 'react'
import './globals.css'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import Sidebar from '@/components/sider'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isAuthPage, setIsAuthPage] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('token') // or any auth flag
    setIsAuthPage(!!token)
  }, [])

  if (isAuthPage === null) return null // or loading spinner

  return (
    <html lang="en">
      <body>
        {isAuthPage ? (
          <>{children}</>
        ) : (
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
              <Header />
              <main className="p-6">{children}</main>
            </div>
          </div>
        )}
      </body>
    </html>
  )
}