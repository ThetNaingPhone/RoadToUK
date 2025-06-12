import { cookies } from 'next/headers'
import { db } from './db'

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const id = cookieStore.get('userId')?.value
  if (!id) return null
  return db.user.findUnique({ where: { id } })
}