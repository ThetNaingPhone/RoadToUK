import { apiHandlerWithAuth } from '@/lib/api-handlers'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export const GET = apiHandlerWithAuth({
  GET: async (_req, _user) => {
    const users = await db.user.findMany()
    return NextResponse.json({ users })
  }
})

export const POST = apiHandlerWithAuth({
  POST: async (req, _user) => {
    try {
      const { name, email, password } = await req.json()
      const passwordHash = await bcrypt.hash(password, 10)

      const user = await db.user.create({
        data: { name, email, passwordHash },
      })

      return NextResponse.json({ user })
    } catch (e) {
      console.error('Error in POST /api/users:', e)
      return NextResponse.json({ error: e.message }, { status: 500 })
    }
  }
})

export const PUT = apiHandlerWithAuth({
  PUT: async (req, _user) => {
    const { id, name, email, passwordHash } = await req.json()
    const user = await db.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(passwordHash && { passwordHash })
      }
    })
    return NextResponse.json({ user })
  }
})

export const DELETE = apiHandlerWithAuth({
  DELETE: async (req, _user) => {
    const { id } = await req.json()
    await db.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  }
})
