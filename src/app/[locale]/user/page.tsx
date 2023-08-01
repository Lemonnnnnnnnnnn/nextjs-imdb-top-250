import { ImdbItem } from '@prisma/client'
import getUserLikes from '@/app/actions/getUserLikes'
import List from './components/List'
import { LocaleRouterParams } from '@/app/types'
import { useTranslate } from '@/app/hooks/useTranslate'

const User = async ({ params }: LocaleRouterParams) => {
  const t = await useTranslate(params.locale)
  let list: ImdbItem[] = await getUserLikes()

  return (
    <div className="mx-0 mt-6 lg:mx-4 lg:mt-10">
      <div className="my-4">
        <div className="text-xl">{t.ILike}</div>
      </div>
      {list.length ? (
        <List t={t} data={list} />
      ) : (
        <div className="text-center text-xl ">{t.noData}</div>
      )}
    </div>
  )
}

export default User
