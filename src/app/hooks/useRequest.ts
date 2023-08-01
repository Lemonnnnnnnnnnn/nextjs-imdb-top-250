import { useState } from 'react'

interface Options {
  manual?: boolean
}

const useRequest = (fn: () => Promise<any>, options?: Options) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  if (!options?.manual) {
    run()
  }

  function run() {
    fn()
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }

  return {
    data,
    loading,
    error,
    run,
  }
}

export default useRequest
