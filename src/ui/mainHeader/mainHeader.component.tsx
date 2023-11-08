
interface Props {
  desarrollo: string
}

export const Header = ({ desarrollo }: Props) => {
  return (
    <section className='py-2'>
      <div>
        <button className=' '>
          <span className='text-[#035a54] font-bold text-2xl'>Iniciar Sesión</span>
        </button>

        <button>
          {/* <image src='/src/app/favicon.ico' alt='' /> */}
          <span className='text-[#cda147] font-bold text-2xl'>Promociones</span>
        </button>
      </div>
      <span className='bg-[#cda147] text-white p-2 rounded-lg'>{desarrollo}</span>
    </section>
  )
}
