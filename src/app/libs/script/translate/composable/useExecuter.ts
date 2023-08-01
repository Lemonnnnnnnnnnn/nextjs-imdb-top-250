import { useTranslate } from './useTranslate'

const TIME_INTERVAL = 200
const MAX_TAST = 5

export interface Save {
  ({ sourceText, text }: { sourceText: string; text: string }): any
}

interface Params {
  data: any[]
  save: Save
}

interface Status {
  index: number
  running: number
}

export const useExecuter = ({ data, save }: Params) => {
  const status: Status = {
    index: 0, // 执行位置
    running: 0, // 队列中有几个任务
  }
  // 定时器
  let timer: NodeJS.Timer

  timer = setInterval(() => {
    console.log(`正在翻译第${status.index}条数据...`)

    const sourceText = data[status.index++]
    if (!sourceText) {
      clearInterval(timer)
      return
    }

    execTask({
      status,
      text: sourceText,
      save: (res: string) => save({ sourceText, text: res }),
    })
  }, TIME_INTERVAL)
}

interface ExecTaskParams {
  status: Status
  text: string
  save: (res: string) => any
}

const execTask = ({ status, text, save }: ExecTaskParams) => {
  console.log({ status })

  if (status.running >= MAX_TAST) {
    // 不执行本次任务，回退指针让定时器重新执行本次任务
    status.index -= 1
    return
  } 
  status.running += 1

  useTranslate(text).then((res) => {
    console.log('翻译结果：', res)

    status.running -= 1
    if (!res) return
    save(res)
  })
}
