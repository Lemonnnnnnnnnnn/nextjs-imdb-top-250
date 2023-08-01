import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

interface RegisterParam {
  email: string
  password: string
  passwordVerify: string
}

const SALT = 12

export async function POST(request: Request) {
  const body: RegisterParam = await request.json()
  const { email, password, passwordVerify } = body

  if (password !== passwordVerify)
    return NextResponse.json({ error: '两次密码不一致' })

  const hashedPassword = await bcrypt.hash(password, SALT)

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) return NextResponse.json({ error: '用户已存在' })

  const newUser = await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  })

  return NextResponse.json({ ...newUser, error: null })
}
