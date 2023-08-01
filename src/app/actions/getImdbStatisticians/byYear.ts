import client from '../../libs/prismadb'

const getRangeCount = async (start: number, end: number) => {
  try {
    return await client.imdbItem.count({
      where: {
        year: {
          gt: start,
          lte: end,
        },
      },
    })
  } catch (e) {
    console.log(e)
    return []
  }
}

const rangeList = [
  [1900, 1950],
  [1950, 1960],
  [1960, 1970],
  [1970, 1980],
  [1980, 1990],
  [1990, 2000],
  [2000, 2010],
  [2010, 2020],
  [2020, 2030],
]

const geImdbStatisticiansByYear = async () => {
  try {
    return await Promise.all(
      rangeList.map(async ([start, end]) => {
        return {
          start,
          end,
          count: Number(await getRangeCount(start, end)),
        }
      })
    )
  } catch (e) {
    console.log(e)

    return []
  }
}


export default geImdbStatisticiansByYear
