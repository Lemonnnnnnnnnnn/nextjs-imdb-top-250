// 请求 IMDB-API 并同步到sqlite
import { LocalDetailRespTypes } from '@/app/types'
import request from '../../service/request'
import { IMDB_API_TOP250, IMDB_API_DETAIL } from '../../consts'
import client from '../prismadb'
import { ImdbItem } from '@prisma/client'
import ImdbItemJson from './ImdbItem.json'

export async function fetchDetail({ id }: Pick<ImdbItem, 'id'>) {
  return await request.get<LocalDetailRespTypes>(`${IMDB_API_DETAIL}/${id}`)
}

export async function fetchTop250() {
  const data = JSON.parse(JSON.stringify(ImdbItemJson))
  data.forEach(
    async ({
      id,
      fullTitle,
      imDbRating,
      imDbRatingCount,
      image,
      rank,
      title,
      year,
    }: ImdbItem) => {
      console.log(`正在处理:${id} ...`)

      const {
        images,
        plot,
        genre,
        releaseDetailed: {
          releaseLocation: { country, cca2 },
        },
        actors,
      } = await fetchDetail({ id })

      await client.imdbItem.create({
        data: {
          id,
          fullTitle,
          imDbRating,
          imDbRatingCount,
          image,
          rank,
          title,
          year,
          plot,
          isTop250: true,
          images: {
            create: images.map((image) => ({
              url: image,
            })),
          },
          genres: {
            connectOrCreate: genre.map((g) => {
              return {
                where: {
                  key: g,
                },
                create: {
                  value: g,
                  key: g,
                },
              }
            }),
          },
          countrys: {
            connectOrCreate: {
              where: {
                key: cca2,
              },
              create: {
                key: cca2,
                value: country,
              },
            },
          },
          actors: {
            connectOrCreate: actors.map((actor) => {
              return {
                where: {
                  id: actor,
                },
                create: {
                  id: actor,
                  name: actor,
                },
              }
            }),
          },
        },
      })
    }
  )
}

// fetchTop250()
// fetchDetail({ id: 'tt0109830' })
