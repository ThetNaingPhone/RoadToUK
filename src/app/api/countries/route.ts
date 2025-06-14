import { apiHandlerWithAuth } from '@/lib/api-handlers'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const GET = apiHandlerWithAuth({
  GET: async (_req, user) => {
    const countries = await db.countries.findMany({ where: { userId: user.id } })
    return NextResponse.json({ countries })
  }
})

export const POST = apiHandlerWithAuth({
  POST: async (req, user) => {
    const { name, code } = await req.json()
    const country = await db.countries.create({
      data: { name, code, userId: user.id }
    })
    return NextResponse.json({ country })
  }
})

export const PUT = apiHandlerWithAuth({
  PUT: async (req, user) => {
    const { id, name, code } = await req.json()
    const country = await db.countries.findUnique({ where: { id } })

    if (!country || country.userId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const updated = await db.countries.update({
      where: { id },
      data: { name, code }
    })

    return NextResponse.json({ country: updated })
  }
})

export const DELETE = apiHandlerWithAuth({
  DELETE: async (req, user) => {
    const { id } = await req.json()
    await db.countries.deleteMany({ where: { id, userId: user.id } })
    return NextResponse.json({ success: true })
  }
})
