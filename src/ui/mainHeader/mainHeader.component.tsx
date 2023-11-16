import { IconArrowSquare } from '@/assets/svgs/icons'
import { DevViewButton } from './components/DevViewButton'

interface Props {
  desarrollo: string
  hasView: boolean
}

export const MainHeader = ({ desarrollo, hasView }: Props) => {
  return (
    <section className='gap-4 w-full flex-row flex py-3'>
      <div className=' w-full flex items-center gap-5'>
        <span className='bg-[#cda147] text-white text-xl px-2 rounded-lg'>{desarrollo}</span>
        {hasView && <DevViewButton />}
      </div>
      <div className=' w-1/5 flex justify-end flex-col items-end '>
        <button className=''>
          <span className='text-[#035a54] font-bold text-2xl'>Iniciar Sesión</span>
        </button>
        <button className=' flex flex-row justify-center items-center gap-1'>
          <IconArrowSquare className='w-4 h-4' />
          <span className='text-[#cda147] font-bold text-xl'>Promociones</span>
        </button>
      </div>
    </section>
  )
}
