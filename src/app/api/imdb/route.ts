import client from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { FormTypes } from '@/app/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const current = Number(searchParams.get('current'))
    const pageSize = Number(searchParams.get('pageSize'))
    const genre = searchParams.get('genre') || ''
    const country = searchParams.get('country') || ''

    let data = await find({
      skip: (current - 1) * pageSize,
      take: pageSize,
      genre,
      country,
    })

    if (!data.length) {
      console.log('没有数据了...')
    }

    const currentUser = await getCurrentUser()

    const list = data.map((item) => ({
      ...item,
      like: item.users.some((u) => u.id === currentUser?.id),
      user: undefined,
    }))

    return NextResponse.json(list)
  } catch (e) {
    console.log(e)
    return NextResponse.json('内部错误', { status: 500 })
  }
}

const find = async ({
  skip,
  take,
  genre,
  country,
}: { skip: number; take: number } & FormTypes) => {


  const filterList = []

  if (genre) {
    filterList.push({
      genres: {
        some: {
          value: genre,
        },
      },
    })
  }

  if(country){
    filterList.push({
      countrys: {
        some: {
          value: country,
        },
      },
    })
  }

  return await client.imdbItem.findMany({
    skip,
    take,
    orderBy: {
      rank: 'asc',
    },
    where: {
      AND : filterList
    },
    include: {
      users: true,
      genres: true,
    },
  })
}
