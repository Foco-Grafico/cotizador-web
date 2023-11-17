import { DEVS_ENDPOINTS } from '@/utils/fetch-data'
import { BatchList } from './components/batch-list'
import { Dev } from '@/types'
import DevView from './components/dev-view'

export default async function BatchPage ({ params }: { params: { id: string } }) {
  const res = await fetch(DEVS_ENDPOINTS.one(params.id), {
    cache: 'no-cache'
  })
  const data = res.ok ? (await res.json()).data as Dev : null

  if (data == null) return <span>Not found</span>

  return (
    <>
      <main className='w-full flex flex-col items-center'>
        {data.view_url != null && <DevView dev={data} />}
        <BatchList maxBlocks={data.max_blocks} devID={params.id} hasView={data.view_url != null} />
      </main>
    </>
  )
}
