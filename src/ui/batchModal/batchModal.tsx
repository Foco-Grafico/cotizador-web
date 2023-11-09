'use client'
import { IconArrowSquare } from '@/assets/svgs/icons'
import { useState } from 'react'

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

export default function BatchModal ({ status, m2, currency, location, price, index, image, onClickDownload, onClickReserve }: Props) {
  const [open, setOpen] = useState(false)

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setOpen(false)
    }
  }

  const toggleModal = () => {
    setOpen(prev => !prev)
  }

  return (
    <aside>
      <IconArrowSquare className='w-4 h-4' onClick={toggleModal} />
      {open && (
        <main className='fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 backdrop-blur-md' onClick={closeModal}>
          <div className='animate-slide-in-right bg-white p-5 border-2 border-gray-800 w-1/4 h-full'>
            <span className='float-right cursor-pointer' onClick={toggleModal}>X</span>
            <img src={image} alt={location} width={650} height={250} />
            <article className='grid grid-cols-1 grid-rows-1 grid-flow-row gap-5 w-full py-5'>
              <div className=' flex flex-row  w-full'>
                <div className='w-1/3 rounded-lg px-2 font-black'>
                  <span>STATUS: </span>
                </div>
                <div className='w-2/3'>
                  <span>{status} </span>
                </div>
              </div>
              <div className=' flex flex-col justify-center items-center mx-10 border-[#fac456] border-[1px] rounded-xl' />
              <div className=' flex flex-row  w-full'>
                <div className='w-1/3 rounded-lg px-2 font-black'>
                  <span>UBICACIÓN</span>
                </div>
                <div className='w-2/3'>
                  <span>{location} </span>
                </div>
              </div>
              <div className=' flex flex-col justify-center items-center mx-10 border-[#fac456] border-[1px] rounded-xl' />
              <div className=' flex flex-row  w-full '>
                <div className='w-1/3 rounded-lg px-2 font-black'>
                  <span>M2:</span>
                </div>
                <div className=' w-2/3'>
                  <span>{m2} </span>
                </div>
              </div>
              <div className=' flex flex-col justify-center items-center mx-10 border-[#fac456] border-[1px] rounded-xl' />
              <div className=' flex flex-row  w-full '>
                <div className='w-1/3 rounded-lg px-2 font-black'>
                  <span>PRECIO:</span>
                </div>
                <div className=' w-2/3'>
                  <span>{price.toLocaleString('es-MX', {
                    style: 'currency',
                    currency
                  })}
                  </span>
                </div>
              </div>
              <div className=' flex flex-col justify-center items-center mx-10 border-[#fac456] border-[1px] rounded-xl' />
              <div className=' flex flex-row  w-full '>
                <div className='w-1/3 rounded-lg px-2 font-black'>
                  <span>MONEDA:</span>
                </div>
                <div className='w-2/3'>
                  <span>{currency} </span>
                </div>
              </div>
              <div className=' flex flex-col justify-center items-center mx-10 border-[#fac456] border-[1px] rounded-xl' />
            </article>
            <section className='flex flex-row gap-5'>
              <button className='bg-[#035a54] font-bold text-lg rounded-xl px-2'>
                <span className='text-white'>Agregar otro lote</span>
              </button>
              <button className='bg-[#035a54] font-bold text-lg rounded-xl px-2'>
                <span className='text-white'>Descargar cotización</span>
              </button>
            </section>
          </div>
        </main>
      )}
    </aside>
  )
}
