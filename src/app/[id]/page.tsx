import { BatchList } from './components/batch-list'

export default async function BatchPage ({ params }: { params: { id: string } }) {
  return (
    <>
      <main className='w-full flex flex-col items-center'>
        <BatchList devID={params.id} />
      </main>
    </>
  )
}
