'use client'
import useSwr from 'swr'
import request from '@/app/service/request'
import { ImdbItemTypes } from '@/app/types'
import Item from './Item'
import { composeApiParams } from '@/app/service/utils'
import { FormTypes } from '@/app/types'

const fetcher = (url: string, params?: Record<keyof any, any>) =>
  request.get<ImdbItemTypes[]>(url, params , false)

interface Props {
  current: number
  params : FormTypes
  setIsOver : (b : boolean) => void 
}

const Page: React.FC<Props> = ({ current , params : _params , setIsOver }) => {
  const params = {
    ..._params,
    current,
    pageSize: 24,
  }
  
  const { data, error } = useSwr(
    composeApiParams({ baseUrl: '/api/imdb', params }),
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  if(!data.length ){
    setIsOver(true)
  }
  

  return (
    <>
      {data.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </>
  )
}

export default Page
