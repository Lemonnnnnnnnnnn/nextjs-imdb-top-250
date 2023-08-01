/* eslint-disable react-hooks/rules-of-hooks */
import client from '../../prismadb'
import { useExecuter } from './composable/useExecuter'
import { Save } from './composable/useExecuter'

export const translateCountry = async () => {
  const data = await useData()
  useExecuter({
    data,
    save,
  })
}

const useData = async () => {
  try {
    const res = await client.country.findMany({
      select: {
        value: true,
      },
    })

    return res.map(({ value }) => value)
  } catch (e) {
    console.log(e)
    return []
  }
}

const save: Save = async ({ sourceText, text }) => {
    try {
        console.log('正在写入数据库...');
        
        await client.country.updateMany({
            where: {
              value: sourceText,
            },
            data: {
              valueCn: text,
            },
          })
    }catch (e){
        console.log('写入失败...');
        
    }
  
}
