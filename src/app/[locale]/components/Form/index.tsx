'use client'

import Button from '@/app/components/buttons/Button'
import { MyListbox } from './MyListbox'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { Country, Genre } from '@prisma/client'
import { dispatch } from './useForm'
import { FormTypes, LocaleType } from '@/app/types'

interface Props {
  genres: Genre[]
  countrys: Country[]
}

const Form: React.FC<Props & LocaleType> = ({
  genres: _genres,
  countrys: _countrys,
  t,
}) => {
  const { control, handleSubmit, reset } = useForm<FormTypes>()

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    dispatch && dispatch(data)
  }

  const onReset = () => {
    reset()
    dispatch && dispatch({})
  }

  let genres = _genres
  let countrys = _countrys

  if (t.lang === 'zh') {
    genres = _genres.map((item) => ({ ...item, value: item.valueCn }))
    countrys = _countrys.map((item) => ({ ...item, value: item.valueCn }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MyListbox
        placeholder={t.selectPlaceholder}
        name="genre"
        label={t.genre}
        list={genres}
        control={control}
      />
      <MyListbox
        placeholder={t.selectPlaceholder}
        name="country"
        label={t.country}
        list={countrys}
        control={control}
      />

      <footer className="mt-4 grid grid-cols-2 gap-4">
        <Button type="reset" onClick={onReset}>
          {t['reset']}
        </Button>
        <Button type="submit">{t['search']}</Button>
      </footer>
    </form>
  )
}

export default Form
