import { LocaleRouterParams } from '@/app/types'
import {
  getImdbStatisticiansByYear,
  getImdbStatisticiansByGenre,
  getMostPopularActor,
} from '../../actions/getImdbStatisticians'
import ActorChart from './components/ActorChart'
import GenreChart from './components/GenreChart'
import YearChart from './components/YearChart'
import { useTranslate } from '@/app/hooks/useTranslate'

const Statisticians = async ({params} : LocaleRouterParams) => {
  const t = await useTranslate(params.locale)

  const yearData = await getImdbStatisticiansByYear()
  const genreData = await getImdbStatisticiansByGenre()
  const mostPopularActor = await getMostPopularActor()

  return (
    <div className='mt-6 lg:mt-10 w-full lg:w-3/5 mx-auto flex flex-col gap-5 lg:gap-10'>
      {yearData && <YearChart t={t} data={yearData} />}
      {genreData && <GenreChart t={t} data={genreData} />}
      {mostPopularActor && <ActorChart t={t} data={mostPopularActor} />}
    </div>
  )
}

export default Statisticians
