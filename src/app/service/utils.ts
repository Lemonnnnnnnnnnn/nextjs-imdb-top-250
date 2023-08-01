export const throttle = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>
  let running = false

  return function (this: any, ...args: any[]) {
    if (running) return
    running = true
    timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer)
      running = false
    }, delay)
  }
}

export const debounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

export const composeApiParams = ({
  baseUrl,
  params: _params,
}: {
  baseUrl: string
  params: Record<keyof any, any>
}) => {
  const params = cleanParams(_params)
  let url = baseUrl
  Object.keys(params).forEach((key) => {
    url += `&${key}=${params[key]}`
  })

  return url.replace(/&/, '?')
}

const cleanParams = (params: Record<keyof any, any>) => {
  const newParams: Record<keyof any, any> = {}

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null)
      newParams[key] = params[key]
  })
  return newParams
}
