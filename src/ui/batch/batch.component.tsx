
interface Props {
  status: string
  m2: number
  currency: string
  location: string
  price: number
  index: number
  image: string
  imagen: string
  onClickDownload?: (index: number) => () => void
  onClickReserve?: (index: number) => () => void
  imgClick?: (url: string) => () => void
}

export default function BatchInfo ({ status, m2, currency, location, price, index, image, imagen, imgClick, onClickDownload, onClickReserve }: Props) {
  // const [active, setActive] = useState(false)
  // const [zoom, setZoom] = useState(false)

  // const handleModal = () => {
  //   setActive(prev => !prev)
  // }

  // const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (e.target === e.currentTarget) {
  //     setActive(false)
  //   }
  // }

  // const handleZoom = () => {
  //   setZoom(prev => !prev)
  // }

  return (
    <article className='flex flex-row border-[#cea550] border rounded-xl gap-4 w-full'>
      <section className='relative rounded-lg flex-row flex items-center overflow-hidden'>
        <div className='absolute top-0 left-0 bg-[#cda052] rounded-tl-lg px-5 border-[#cda052] text-white'>
          {index}
        </div>
        <img onClick={imgClick?.(image)} src={image} alt={location} width={650} height={250} className='cursor-pointer overflow-hidden flex items-center justify-center px-2 py-2' />
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
      {/* {active && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md' onClick={closeModal}>
          <div className={`animate-slide-up flex justify-center items-center bg-white p-5 border-2 border-gray-800 w-3/4 h-3/4 ${zoom ? 'w-full h-full flex items-center justify-center scale-150' : ''}`}>
            <span className='cursor-pointer' onClick={handleModal}>X</span>
            <img src={imagen} alt='' width={792} height={750} onClick={handleZoom} />
          </div>
        </div>
      )} */}
    </article>
  )
}
