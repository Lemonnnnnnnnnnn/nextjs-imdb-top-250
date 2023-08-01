import client from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'

const LIKE = 1

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const currentUser = await getCurrentUser()

    const { id: imdbItemId, type } = body

    await client.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        likeImdbItem: {
          [type === LIKE ? 'connect' : 'disconnect']: {
            id: imdbItemId,
          },
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.log(e)

    return new NextResponse('Internel Error', { status: 500 })
  }
}
