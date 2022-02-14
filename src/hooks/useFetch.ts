import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({ baseURL: 'https://api.github.com' })

export function useFetch<T = unknown>(url: string, config?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    api.get(url, config)
      .then((response) => { setData(response.data); setError(null) })
      .catch((error) => setError(error))
      .finally(() => setIsFetching(false))
  }, [])

  return { data, error, isFetching }
}
