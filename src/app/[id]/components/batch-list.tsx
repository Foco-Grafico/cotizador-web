'use client'

import useBatches from '@/hooks/use-batches'
import BatchInfo from '@/ui/batch/batch.component'
import { API_URL } from '@/utils/fetch-data'

interface Props {
  devID: number | string
}

export const BatchList = ({ devID }: Props) => {
  const { batches, error, loading, nextPage, prevPage, page } = useBatches({ devID })

  return (
    <section className='w-[60rem] h-full flex flex-col'>
      <div className='overflow-y-auto flex-1 w-full'>
        {loading && <span className='w-full flex justify-center items-center'>Loading...</span>}
        {error != null && <span className='w-full flex justify-center items-center'>{error.message}</span>}
        {!loading && batches.map((batch) => (
          <BatchInfo key={batch.id} index={batch.id} m2={batch.sq_m} currency={batch.currency} price={batch.price} status={batch.status.name} location={batch.location} image={`${API_URL}/${batch.assets[0].asset_url}`} imagen={`${API_URL}/${batch.assets[0].asset_url}`} />
        ))}
      </div>
      <div className='flex justify-center items-center gap-3'>
        <button onClick={prevPage}>prev</button>
        <span>{page}</span>
        <button onClick={nextPage}>next</button>
      </div>
    </section>
  )
}
