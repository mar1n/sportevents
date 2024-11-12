import { useEffect, useState } from 'react'

const useApi = <T,>(resource: string) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResource = async () => {
      setLoading(true)
      try {
        console.log('resource', resource)
        const response = await fetch(`${process.env.NEXT_SERVER_DEV}/${resource}`)

        if (response.ok) {
          const body = await response.json()
          setData(body.results)
        }
      } catch (error) {
        console.log('error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResource()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    data,
  }
}

export default useApi
