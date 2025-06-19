import { apiHandlerWithAuth } from '@/lib/api-handlers'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export const GET = apiHandlerWithAuth({
  GET: async (req, user) => {
    if (user.role !== 'SUPER_ADMIN') {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')
    const email = searchParams.get('email')

    const where: any = {}
    if (username) where.username = { contains: username, mode: 'insensitive' }
    if (email) where.email = { contains: email, mode: 'insensitive' }

    const admin = await db.admin.findMany({ where })
    return NextResponse.json({ admin })
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