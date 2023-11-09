import BatchInfo from '@/ui/batchInfo/batchInfo.component'
import BatchModal from '@/ui/batchModal/batchModal'
import { Header } from '@/ui/mainHeader/mainHeader.component'

export default function Home () {
  return (
    <>
      <main className='h-screen w-full'>
        <header>
          <Header desarrollo='Colina Perla Residencial' />
        </header>
        <BatchInfo index={1} m2={199} currency='MXN' price={1900000} status='Disponible' location='Húmedo' image='/public/logos/deluxe.png' />
        <BatchModal index={1} m2={199} currency='MXN' price={1900000} status='Disponible' location='Húmedo' image='/public/logos/deluxe.png' />
      </main>
    </>
  )
}
