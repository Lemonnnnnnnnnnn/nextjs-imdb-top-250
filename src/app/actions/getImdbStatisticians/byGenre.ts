import client from '../../libs/prismadb'


const getImdbStatisticiansByGenre = async () => {
  try {
    return await client.genre.findMany({
      include: {
        _count: {
          select: {
            imdbItems: true,
          },
        },
      },
      orderBy: {
        imdbItems: {
          _count: 'desc',
        },
      },
      take : 6
    })
  } catch (e) {
    console.log(e)
  }
}

export default getImdbStatisticiansByGenre
