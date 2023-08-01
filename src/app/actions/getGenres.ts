import client from '../libs/prismadb'

const getGenres = async () => {
  try {
    const genres = await client.genre.findMany({})

    return genres
  } catch (e) {
    console.log(e)
    return []
  }
}

export default getGenres
