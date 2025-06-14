// api/auth/signup/route.ts
import { apiHandlerNoAuth } from '@/lib/api-handlers'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const POST = apiHandlerNoAuth({
  POST: async (req) => {
    const { name, email, password } = await req.json()
    const exists = await db.user.findUnique({ where: { email } })
    if (exists) return new NextResponse('Email exists', { status: 400 })
    const pw = await bcrypt.hash(password, 10)
    const user = await db.user.create({ data: {name,   email, password: pw } })
    return NextResponse.json({ id: user.id })
  }
})
