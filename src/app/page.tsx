import BatchInfo from '@/ui/batchInfo/batchInfo.component'

export default function Home () {
  return (
    <>
      <main className='h-screen w-full'>
        <header>
          a
        </header>
        <BatchInfo index={1} m2={199} currency='MXN' price={1900000} status='Disponible' location='Húmedo' image='/public/logos/deluxe.png' />
      </main>
    </>
  )
}
