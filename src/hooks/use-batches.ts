import { Batch } from '@/types'
import { BATCH_ENDPOINTS } from '@/utils/fetch-data'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  devID: number | string
}

export default function useBatches ({ devID }: Props) {
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const [batchConfig, setBatchConfig] = useState({
    page: 1,
    elements: 50
  })

  const nextPage = () => {
    setBatchConfig(prev => ({
      ...prev,
      page: prev.page + 1
    }))
  }

  const prevPage = useCallback(() => {
    if (batchConfig.page <= 1) return

    setBatchConfig(prev => ({
      ...prev,
      page: prev.page - 1
    }))
  }, [batchConfig.page])

  useEffect(() => {
    setLoading(true)
    setError(undefined)
    fetch(BATCH_ENDPOINTS.inDev({ devID, elements: batchConfig.elements, page: batchConfig.page }))
      .then(async res => {
        console.log(res)

        if (res.ok) {
          return await res.json()
        }

        if (res.status === 404) {
          if (batchConfig.page > 1) {
            prevPage()
            globalThis.alert('No hay más lotes para mostrar')
            return
          }

          setError(new Error('No se han encontrado lotes para este desarrollo.'))
          return {
            data: []
          }
        }

        throw new Error('Ha ocurrido un error al cargar los lotes')
      })
      .then(data => {
        setBatches(data.data)
      })
      .catch(err => {
        console.error(err)
        setError(new Error('Ha ocurrido un error al cargar los lotes'))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [devID, batchConfig, prevPage])

  return { batches, loading, error, prevPage, nextPage, page: batchConfig.page }
}
