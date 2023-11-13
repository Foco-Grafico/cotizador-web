import { API_URL } from '@/utils/fetch-data'

interface Props {
  status: string
  m2: number
  currency: string
  location: string
  price: number
  index: number
  image: string
  onClickDownload?: (index: number) => () => void
  onClickReserve?: (index: number) => () => void
  imgClick?: (url: string) => () => void
}

export default function BatchInfo ({ status, m2, currency, location, price, index, image, imgClick, onClickDownload, onClickReserve }: Props) {
  const url = image.startsWith('http') ? image : `${API_URL}/${image}`

  return (
    <article className='flex flex-row border-[#cea550] border rounded-xl gap-4 w-full'>
      <section className='relative rounded-lg flex-row flex items-center overflow-hidden'>
        <div className='absolute top-0 left-0 bg-[#cda052] rounded-tl-lg px-5 border-[#cda052] text-white'>
          {index}
        </div>
        <img onClick={imgClick?.(url)} src={url} alt={location} width={650} height={250} className='cursor-pointer overflow-hidden flex items-center justify-center pl-5' />
        <div className='border-r-[#cea550] border h-3/4 ' />
      </section>
      <section className='flex flex-col gap-10 items-center justify-center w-full py-4 px-10'>
        <div className='grid grid-flow-row grid-rows-2 gap-5 w-full h-full grid-cols-3 items-center justify-center '>
          <div className='w-full text-center'>
            <div className='bg-[#e5e5e5] text-xl w-36 rounded-lg px-2 font-black inline-block'>
              <span>STATUS</span>
            </div>
            <div className='text-xl'>
              <span>{status} </span>
            </div>
          </div>
          <div className='w-full text-center'>
            <div className='bg-[#e5e5e5] text-xl  w-36 rounded-lg px-2 font-black inline-block'>
              <span>M2</span>
            </div>
            <div className='text-xl'>
              <span>{m2} </span>
            </div>
          </div>
          <div className='w-full text-center'>
            <div className='bg-[#e5e5e5] text-xl w-36 rounded-lg px-2 font-black inline-block'>
              <span>MONEDA</span>
            </div>
            <div className='text-xl'>
              <span>{currency} </span>
            </div>
          </div>
          <div className='w-full text-center'>
            <div className='bg-[#e5e5e5] text-xl w-36 rounded-lg px-2 font-black inline-block'>
              <span>UBICACIÓN</span>
            </div>
            <div className='text-xl'>
              <span>{location} </span>
            </div>
          </div>
          <div className='w-full text-center'>
            <div className='bg-[#e5e5e5] text-xl w-36 rounded-lg px-2 font-black inline-block'>
              <span>PRECIO</span>
            </div>
            <div className='text-xl'>
              <span>{price.toLocaleString('es-MX', {
                style: 'currency',
                currency
              })}
              </span>
            </div>
          </div>
        </div>
        <div className='flex justify-end items-end gap-4 h-10 w-full'>
          <button onClick={onClickDownload?.(index)} className='bg-[#035a54] text-white px-2 py-1 rounded-xl'>
            Descargar Cotización
          </button>
          <button onClick={onClickReserve?.(index)} className='bg-[#035a54] text-white px-2 py-1 rounded-xl'>
            Apartar en Linea
          </button>
        </div>
      </section>
    </article>
  )
}
