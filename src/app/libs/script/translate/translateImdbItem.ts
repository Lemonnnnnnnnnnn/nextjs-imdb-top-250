/* eslint-disable react-hooks/rules-of-hooks */
import client from '../../prismadb'
import { useExecuter } from './composable/useExecuter'
import { Save } from './composable/useExecuter'

export const translateImdb = async () => {
  const plotData = await usePlotData()
  useExecuter({
    data: plotData,
    save: savePlot,
  })

  const titleData = await useTitleData()
  useExecuter({
    data: titleData,
    save: saveTitle,
  })
}

const usePlotData = async () => {
  try {
    const res = await client.imdbItem.findMany({
      select: {
        plot: true,
      },
    })

    return res.map(({ plot }) => plot)
  } catch (e) {
    console.log(e)
    return []
  }
}

const useTitleData = async () => {
  try {
    const res = await client.imdbItem.findMany({
      select: {
        title: true,
      },
    })

    return res.map(({ title }) => title)
  } catch (e) {
    console.log(e)
    return []
  }
}

const savePlot: Save = async ({ sourceText, text }) => {
  try {
    console.log('正在写入数据库...')

    await client.imdbItem.updateMany({
      where: {
        plot: sourceText,
      },
      data: {
        plotCn: text,
      },
    })
  } catch (e) {
    console.log('写入失败...')
  }
}

const saveTitle: Save = async ({ sourceText, text }) => {
  try {
    console.log('正在写入数据库...')

    await client.imdbItem.updateMany({
      where: {
        title: sourceText,
      },
      data: {
        titleCn: text,
      },
    })
  } catch (e) {
    console.log('写入失败...')
  }
}
