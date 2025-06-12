import { apiHandlerWithAuth } from '@/lib/api-handlers'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const GET = apiHandlerWithAuth({
  GET: async (_req, user) => NextResponse.json({tasks: await db.task.findMany({where:{userId:user.id}})})
})

export const POST = apiHandlerWithAuth({
  POST: async (req, user) => {
    const {title} = await req.json()
    const t = await db.task.create({data:{title,userId:user.id}})
    return NextResponse.json({task: t})
  }
})

export const PUT = apiHandlerWithAuth({
  PUT: async (req, user) => {
    const {id,done} = await req.json()
    const t = await db.task.findUnique({where:{id}})
    if (!t || t.userId !== user.id) return new NextResponse('Forbidden',{status:403})
    const updated = await db.task.update({where:{id},data:{done}})
    return NextResponse.json({task: updated})
  }
})

export const DELETE = apiHandlerWithAuth({
  DELETE: async (req, user) => {
    const {id} = await req.json()
    await db.task.deleteMany({where:{id, userId: user.id}})
    return NextResponse.json({success:true})
  }
})
