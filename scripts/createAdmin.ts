import prisma from '../src/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const email = 'admin@example.com'
  const username = 'admin'
  const password = 'yourpassword'
  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.create({
    data: {
      email,
      username,
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  })

  console.log('Admin created:', admin)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())