import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

let client: PrismaClient
if (!globalThis.prisma) {
  client = new PrismaClient()
  globalThis.prisma = client
} else {
  client = globalThis.prisma
}

export default client
