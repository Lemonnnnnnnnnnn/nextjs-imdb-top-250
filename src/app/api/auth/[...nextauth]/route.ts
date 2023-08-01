import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/app/libs/prismadb'
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: {
          label: 'Password',
          type: 'password',
        },
        email: {
          label: 'Email',
          type: 'text',
        },
      },
      async authorize(credentials) {
        // 返回授权的用户对象，https://next-auth.js.org/configuration/providers/credentials

        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        })

        // 用户名不存在或用户是用第三方Oauth登录的，不存在密码
        if (!user || !user?.hashedPassword) {
          throw new Error('帐号不存在')
        }

        const isCorrentPassword = bcrypt.compareSync(
          credentials!.password,
          user.hashedPassword
        )

        if (!isCorrentPassword) {
          throw new Error('帐号或密码错误')
        }

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
