import client from '../libs/prismadb'
import getSession from './getSession'

export const getCurrentUser = async () => {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = client.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        likeImdbItem: true,
      },
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (e) {
    console.log(e)
    return null
  }
}

export default getCurrentUser
