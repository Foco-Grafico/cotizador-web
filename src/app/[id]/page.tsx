import BatchInfo from '@/ui/batch/batch.component'
import { API_URL, BATCH_ENDPOINTS } from '@/utils/fetch-data'

export default async function BatchPage ({ params }: { params: { id: string } }) {
  const res = await fetch(BATCH_ENDPOINTS.inDev(params.id), {
    cache: 'no-cache'
  })
  const data = res.ok ? (await res.json()).data : []

  console.log(data[0].assets[0].asset_url)

  return (
    <>
      <main className='h-screen w-full px-80'>
        <header>
          {params.id}
        </header>
        {data.map((batch: any) => (
          <BatchInfo key={batch.id} index={batch.id} m2={batch.sq_m} currency={batch.currency} price={batch.price} status={batch.status} location={batch.location} image={`${API_URL}/${batch.assets[0].asset_url}`} imagen={`${API_URL}/${batch.assets[0].asset_url}`} />
        ))}
      </main>
    </>
  )
}
