import { Batch } from '@/types'
import { BATCH_ENDPOINTS } from '@/utils/fetch-data'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useRef } from 'react'

interface Props {
  devID: number | string
}

export default function useBatches ({ devID }: Props) {
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()
  const router = useRouter()
  const [max, setMax] = useState(1)
  const [elements, setElements] = useState(30)
  const abortController = useRef(new AbortController())

  const params = useSearchParams()

  const prevPage = useCallback(() => {
    if (Number(params.get('page')) === 1) return
    setLoading(true)

    const page = Number(params.get('page')) - 1 === 0 ? 1 : Number(params.get('page')) - 1

    router.push(`/${devID}?page=${page}`)
  }, [devID, params, router])

  const nextPage = () => {
    console.log(max, Number(params.get('page')))
    if (max === Number(params.get('page'))) return
    setLoading(true)

    const page = Number(params.get('page')) + 1

    router.push(`/${devID}?page=${page}`)
  }

  useEffect(() => {
    setError(undefined)

    try {
      abortController.current.abort('Previous request cancelled')
      abortController.current = new AbortController()
    } catch {
      // Do nothing
    }

    const fetchBatches = async () => await fetch(BATCH_ENDPOINTS.inDev({ devID, elements, page: Number(params.get('page')) }), {
      signal: abortController.current.signal
    })

    fetchBatches()
      .then(async res => {
        if (res.ok) {
          return await res.json()
        }

        if (res.status === 404) {
          setError(new Error('No se han encontrado lotes para este desarrollo.'))
          return {
            data: []
          }
        }

        throw new Error('Ha ocurrido un error al cargar los lotes')
      })
      .then(data => {
        setBatches(data.data)
        setMax(data.max_pages)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        if (err.name === 'AbortError') return

        setLoading(false)
        setError(new Error('Ha ocurrido un error al cargar los lotes'))
      })
  }, [devID, elements, params, prevPage])

  return { batches, loading, error, prevPage, nextPage, setElements, page: Number(params.get('page')) }
}
