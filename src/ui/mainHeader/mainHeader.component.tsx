
interface Props {
  desarrollo: string
}

export const Header = ({ desarrollo }: Props) => {
  return (
    <section className='py-2 gap-4 w-full flex-row flex px-10'>
      <div className=' w-full flex items-center gap-5 '>
        <span className='bg-[#cda147] text-white text-2xl py-1 px-2 rounded-lg'>{desarrollo}</span>
        <button className='text-white p-1 font-bold text-xl rounded-md bg-[#035a54]'>Ver recorrido 360°</button>
      </div>
      <div className=' w-1/5 flex justify-end flex-col items-end '>
        <button className=' '>
          <span className='text-[#035a54] font-bold text-2xl'>Iniciar Sesión</span>
        </button>
        <button>
          {/* <image src='/src/app/favicon.ico' alt='' /> */}
          <span className='text-[#cda147] font-bold text-2xl'>Promociones</span>
        </button>
      </div>

    </section>
  )
}
