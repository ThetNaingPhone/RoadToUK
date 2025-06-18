import { apiHandlerWithAuth } from '@/lib/api-handlers'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export const GET = apiHandlerWithAuth({
  GET: async (_req, user) => {
    if (user.role !== 'SUPER_ADMIN') {
      return new NextResponse('Forbidden', { status: 403 })
    }
    const users = await db.user.count(), admin = await db.admin.count()
    return NextResponse.json({ totalUsers: users, admin: admin })
  }
})


export const POST = apiHandlerWithAuth({

  POST: async (req, user) => {
    const { username, email, password } = await req.json()
    const passwordHash = await bcrypt.hash(password, 10)

    try {
      const admin = await db.admin.create({
        data: {
          username,
          email,
          passwordHash,
        },
      })
      return NextResponse.json({ admin })
    } catch (e: any) {
      console.error(e)
      return NextResponse.json({ error: e.message }, { status: 500 })
    }

  }
})