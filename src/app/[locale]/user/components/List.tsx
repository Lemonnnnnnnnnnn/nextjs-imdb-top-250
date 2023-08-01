import { ImdbItem } from '@prisma/client'
import Item from './Item'
import { LocaleType } from '@/app/types'
interface ListProps {
  data: ImdbItem[]
}

const List: React.FC<ListProps & LocaleType> = ({ data , t }) => {
  return (
    <ul className="flex flex-col gap-2 lg:gap-5 mx-1 lg:mx-2">
      {data.map((item) => (
        <Item {...item} key={item.id} t={t} />
      ))}
    </ul>
  )
}

export default List
