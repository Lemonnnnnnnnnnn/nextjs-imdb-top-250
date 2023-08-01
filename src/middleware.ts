import { withAuth } from 'next-auth/middleware'

export default withAuth(
  {
    pages: {
      signIn: '/(zh|en)',
    },
  }
)

export const config = { matcher: ['/(zh|en)/user'] }
