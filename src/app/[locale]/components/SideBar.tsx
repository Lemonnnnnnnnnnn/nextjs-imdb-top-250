import getGenres from '@/app/actions/getGenres'
import Box from '@/app/components/Box'
import Form from './Form'
import getCountrys from '@/app/actions/getCountrys'
import { LocaleType } from '@/app/types'

const SideBar = async ({t} : LocaleType) => {
  const genres = await getGenres()
  const countrys = await getCountrys()

  return (
    <aside
      className="
                hidden
                lg:block
                lg:shrink-0
                lg:basis-80
            "
    >
      <Box
        className="
          mr-4
          mt-4
          h-[100vh]
          bg-white
          p-4
          shadow-xl
          ring-2
          ring-stone-200
          dark:ring-slate-800
        "
      >
        <p
          className="
            mb-5 
            border-b-2 
            border-stone-100 
            py-3
            font-mono
            text-xl
          "
        >
          
          {t['filter']}：
        </p>
        <Form t={t} countrys={countrys} genres={genres} />
      </Box>
    </aside>
  )
}

export default SideBar
