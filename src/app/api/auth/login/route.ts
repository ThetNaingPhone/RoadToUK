// api/auth/login/route.ts
import { apiHandlerNoAuth } from '@/lib/api-handlers'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const POST = apiHandlerNoAuth({
  POST: async (req) => {
    const { email, password } = await req.json()
    const user = await prisma.admin.findUnique({
      where: { email },
    });
if (!user || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
  return new NextResponse('Unauthorized', { status: 401 })
}
    const cookieStore = await cookies();
    cookieStore.set({ name: 'userId', value: user.id, path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    return NextResponse.json({ id: user.id })
  }
})
