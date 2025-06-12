import { apiHandlerWithAuth } from '@/lib/api-handlers'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const GET = apiHandlerWithAuth({
  GET: async (_req, user) => {
    if (user.role !== 'ADMIN') return new NextResponse('Forbidden',{status:403})
    const users = await db.user.count(), tasks = await db.task.count()
    return NextResponse.json({totalUsers: users, totalTasks: tasks})
  }
})
