import { cookies } from 'next/headers'
import prisma from './prisma'

export async function getCurrentUser() {
  const cookieStore = cookies()
  const userId = cookieStore.get('userId')?.value
  const userType = cookieStore.get('userType')?.value

  if (!userId || !userType) return null

  if (userType === 'admin') {
    const admin = await prisma.admin.findUnique({ where: { id: userId } })
    if (!admin) return null
    return { ...admin, userType: 'admin' }
  } else if (userType === 'user') {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return null
    return { ...user, userType: 'user' }
  }
  return null
}