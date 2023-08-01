import getCurrentUser from './getCurrentUser'

export const getUserLikes = async () => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return []

    return currentUser.likeImdbItem
  } catch (e) {
    console.log(e)
    return []
  }
}

export default getUserLikes
