import client from '../libs/prismadb'

const getCountrys = async () => {
  try {
    const countrys = await client.country.findMany({})

    return countrys
  } catch (e) {
    console.log(e)
    return []
  }
}

export default getCountrys
