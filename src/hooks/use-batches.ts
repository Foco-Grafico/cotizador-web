import type { Batch, Filters, StatusWithKey } from '@/types'
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
  const [filters, setFilters] = useState<Filters>({
    amenties: undefined,
    area: undefined,
    coords: undefined,
    currency: undefined,
    location: undefined,
    longitude: undefined,
    perimeter: undefined,
    price: undefined,
    sides: undefined,
    sqm: undefined,
    block: undefined,
    type: undefined
  })

  const [batchTypes, setBatchTypes] = useState<StatusWithKey[]>([])

  useEffect(() => {
    fetch(BATCH_ENDPOINTS.types, {
      cache: 'no-cache'
    })
      .then(async (res) => {
        if (res.ok) {
          return await res.json()
        }
        throw new Error('Ha ocurrido un error al cargar los tipos de lote')
      })
      .then(data => {
        setBatchTypes(data.data)
      })
      .catch(err => console.log(err))
  }, [])

  const params = useSearchParams()

  const prevPage = useCallback(() => {
    if (Number(params.get('page')) === 1) return
    setLoading(true)

    const page = Number(params.get('page')) - 1 === 0 ? 1 : Number(params.get('page')) - 1

    router.push(`/${devID}?page=${page}&name=${params.get('name') ?? ''}`)
  }, [devID, params, router])

  const nextPage = () => {
    console.log(max, Number(params.get('page')))
    if (max === Number(params.get('page'))) return
    setLoading(true)

    const page = Number(params.get('page')) + 1

    router.push(`/${devID}?page=${page}&name=${params.get('name') ?? ''}`)
  }

  useEffect(() => {
    setError(undefined)

    try {
      abortController.current.abort('Previous request cancelled')
      abortController.current = new AbortController()
    } catch {
      // Do nothing
    }

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')

    const options = {
      method: 'POST',
      headers,
      signal: abortController.current.signal,
      body: JSON.stringify({
        amenties: filters.amenties,
        area: filters.area,
        coords: filters.coords,
        currency: filters.currency,
        location: filters.location,
        longitude: filters.longitude,
        perimeter: filters.perimeter,
        price: filters.price,
        sides: filters.sides,
        sq_m: filters.sqm,
        block: filters.block,
        type: filters.type
      })
    }

    const fetchBatches = async () => await fetch(BATCH_ENDPOINTS.inDev({ devID, elements, page: Number(params.get('page')) }), options)

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
  }, [devID, elements, params, prevPage, filters])

  return { batches, loading, error, prevPage, nextPage, setElements, page: Number(params.get('page')), setFilters, batchTypes }
}
