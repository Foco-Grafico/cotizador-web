'use client'

import useBatches from '@/hooks/use-batches'
import BatchInfo from '@/ui/batch/batch.component'
import { API_URL } from '@/utils/fetch-data'

interface Props {
  devID: number | string
}

export const BatchList = ({ devID }: Props) => {
  const { batches, error, loading } = useBatches({ devID })

  if (loading) return <span>Loading...</span>

  if (error != null) return <span>{error.message}</span>

  return (
    <section className='w-[60rem]'>
      {batches.map((batch) => (
        <BatchInfo key={batch.id} index={batch.id} m2={batch.sq_m} currency={batch.currency} price={batch.price} status={batch.status.name} location={batch.location} image={`${API_URL}/${batch.assets[0].asset_url}`} imagen={`${API_URL}/${batch.assets[0].asset_url}`} />
      ))}
    </section>
  )
}
