import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

// https://next-auth.js.org/configuration/nextjs#getserversession

export const getSession = async () => {
  const session = getServerSession(authOptions)

  return session
}

export default getSession
