import { apiHandlerWithAuth } from '@/lib/api-handlers'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const GET = apiHandlerWithAuth({
  GET: async (_req, _user) => {
    const countries = await db.country.findMany()
    return NextResponse.json({ countries })
  }
})

export const POST = apiHandlerWithAuth({
  POST: async (req, user) => {
    try {
      const { name, code, description} = await req.json()
      if (!user || !user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const country = await db.country.create({
        data: {
          name, code, description,
          createdById: user.id,
        },
      })
      return NextResponse.json({ country })
    }
    catch (e) {
      console.error('Error in POST /api/country:', e)
      return NextResponse.json({ error: e.message }, { status: 500 })
    }
  }
})

export const PUT = apiHandlerWithAuth({
  PUT: async (req, user) => {
    const { id, name, code } = await req.json()
    const country = await db.country.findUnique({ where: { id } })

    if (!country) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const updated = await db.country.update({
      where: { id },
      data: { name, code }
    })

    return NextResponse.json({ country: updated })
  }
})

export const DELETE = apiHandlerWithAuth({
  DELETE: async (req, user) => {
    const { id } = await req.json()
    await db.country.deleteMany({ where: { id } })
    return NextResponse.json({ success: true })
  }
})
