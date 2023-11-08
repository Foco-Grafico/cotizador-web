import { BATCH_ENDPOINTS } from '@/utils/fetch-data'

export default async function BatchPage ({ params }: { params: { id: string } }) {
  const res = await fetch(BATCH_ENDPOINTS.inDev(params.id), {
    cache: 'no-cache'
  })
  const data = res.ok ? (await res.json()).data : []

  console.log(data)

  return (
    <>
      <main className='h-screen w-full'>
        <header>
          {params.id}
        </header>
      </main>
    </>
  )
}
