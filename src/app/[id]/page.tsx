export default function BatchPage ({ params }: { params: { id: string } }) {
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
