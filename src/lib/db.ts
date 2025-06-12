// lib/db.ts
import { PrismaClient } from '@prisma/client'

// Add prisma to the NodeJS global type to prevent multiple instances in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
  // In production, instantiate a new client every time
  db = new PrismaClient()
} else {
  // In development, reuse the global client if it exists
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  db = global.prisma
}

export { db }
