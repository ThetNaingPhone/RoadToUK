import { apiHandlerNoAuth } from '@/lib/api-handlers'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const POST = apiHandlerNoAuth({
  POST: async (req) => {
    const { email, password } = await req.json()

    // Try Admin first
    let user = await prisma.admin.findUnique({ where: { email } })
    let userType = 'admin'

    // If not found, try User table
    if (!user) {
      user = await prisma.user.findUnique({ where: { email } })
      userType = 'user'
    }

    if (!user || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const cookieStore = cookies()
    cookieStore.set({
      name: 'userId',
      value: user.id,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    cookieStore.set({
      name: 'userType',
      value: userType,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

    return NextResponse.json({ id: user.id, userType })
  }
})