'use client'
interface Props {
  status: string
  m2: number
  currency: string
  location: string
  price: number
  index: number
  image: string
  onClickDownload?: (index: number) => void
  onClickReserve?: (index: number) => void
}

export default function BatchInfo ({ status, m2, currency, location, price, index, image, onClickDownload, onClickReserve }: Props) {
  return (
    <main className='p-2'>
      <article className='p-4 flex flex-row border-[#cea550] border rounded-xl gap-4'>
        <section className='relative rounded-lg  flex-row flex gap-10 items-center'>
          <div className='absolute top-0 left-0 bg-[#cda052] w-10 rounded-tl-lg px-2 text-white'>
            {index}
          </div>
          <img src={image} alt={location} width={650} height={250} />
          <div className='border-r-[#cea550] border h-3/4 ' />
        </section>
        <section className='flex flex-col gap-10 items-center justify-center w-full'>
          <div className='flex flex-wrap gap-5'>
            <div className=''>
              <div className='bg-[#e5e5e5]  w-auto rounded-lg px-2 font-black'>
                <span>STATUS</span>
              </div>
              <div className=''>
                <span>{status} </span>
              </div>
            </div>
            <div className=''>
              <div className='bg-[#e5e5e5]  w-auto rounded-lg px-2 font-black'>
                <span>M2</span>
              </div>
              <div className=''>
                <span>{m2} </span>
              </div>
            </div>
            <div className=''>
              <div className='bg-[#e5e5e5]  w-auto rounded-lg px-2 font-black'>
                <span>MONEDA</span>
              </div>
              <div className=''>
                <span>{currency} </span>
              </div>
            </div>
            <div className=''>
              <div className='bg-[#e5e5e5]  w-auto rounded-lg px-2 font-black'>
                <span>UBICACIÓN</span>
              </div>
              <div className=''>
                <span>{location} </span>
              </div>
            </div>
            <div className=''>
              <div className='bg-[#e5e5e5]  w-auto rounded-lg px-2 font-black'>
                <span>PRECIO</span>
              </div>
              <div className=''>
                <span>{price.toLocaleString('es-MX', {
                  style: 'currency',
                  currency
                })}
                </span>
              </div>
            </div>
          </div>
          <div className='flex justify-end items-end gap-4 h-10'>
            <button onClick={() => { onClickDownload?.(index) }} className='bg-[#035a54] text-white px-2 py-1 rounded-xl hover:scale-75 transition'>
              Descargar Cotización
            </button>
            <button onClick={() => { onClickReserve?.(index) }} className='bg-[#035a54] text-white px-2 py-1 rounded-xl hover:scale-75 transition'>
              Apartar en Linea
            </button>
          </div>
        </section>
      </article>
    </main>
  )
}
