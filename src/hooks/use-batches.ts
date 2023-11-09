import { Batch } from '@/types'
import { BATCH_ENDPOINTS } from '@/utils/fetch-data'
import { useEffect, useState } from 'react'

interface Props {
  devID: number | string
}

export default function useBatches ({ devID }: Props) {
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    fetch(BATCH_ENDPOINTS.inDev(devID))
      .then(async res => {
        if (res.ok) {
          return await res.json()
        }
        setError(new Error('No se han encontrado lotes para este desarrollo'))
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
  }, [devID])

  return { batches, loading, error }
}
