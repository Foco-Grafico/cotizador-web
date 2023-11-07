'use client'

export default function BatchInfo () {
  const options = [
    {
      name: 'Estatus',
      value: 'Disponible'
    },
    {
      name: 'M2',
      value: '119'
    },
    {
      name: 'Moneda',
      value: 'MXN'
    },
    {
      name: 'Ubicación',
      value: 'Piso 1'
    },
    {
      name: 'Precio',
      value: '1,000,000'
    }
  ]

  return (
    <main className='p-2'>
      <article className='p-4 flex flex-row border-[#cea550] border rounded-xl gap-4'>
        <section className='relative rounded-lg border flex-row flex gap-10 items-center'>
          <div className='absolute top-0 left-0 bg-[#cda052] w-10 rounded-tl-lg px-2 text-white'>
            001
          </div>
          <img src='/logos/deluxe.png' alt='Logo de la empresa' width={650} />
          <div className='border-r-[#cea550] border h-3/4 ' />
        </section>
        <section className='flex flex-col gap-10 items-center justify-center w-full'>
          <div className='flex flex-wrap gap-5'>
            {options.map((option) => (
              <div key={option.name} className=''>
                <div className='bg-[#e5e5e5]  w-24 rounded-lg px-2 font-black'>
                  <span>{option.name} </span>
                </div>
                <div className=''>
                  <span>{option.value} </span>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-end items-end gap-4 h-10'>
            <button className='bg-[#035a54] text-white px-2 py-1 rounded-xl hover:scale-75 transition'>
              Descargar Cotización
            </button>
            <button className='bg-[#035a54] text-white px-2 py-1 rounded-xl hover:scale-75 transition'>
              Apartar en Linea
            </button>
          </div>
        </section>
      </article>
    </main>
  )
}
