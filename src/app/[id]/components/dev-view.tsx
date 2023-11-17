'use client'
import { Dev } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './batch-list.module.css'

interface Props {
  dev: Dev
}

export default function DevView ({ dev }: Props) {
  const params = useSearchParams()
  const devview = params.get('devview')
  const router = useRouter()
  const pathname = usePathname()

  const closeModal = () => {
    const searchParams = new URLSearchParams(params.toString())

    searchParams.delete('devview')

    router.push(`${pathname}?${searchParams.toString()}`)
  }

  if (dev.view_url == null) return null

  return devview === 'true' && (
    <section className={`absolute w-screen h-screen overflow-hidden backdrop-blur-md bg-zinc-800/70 inset-0 z-10 ${styles.modal} sm:py-24 sm:px-48`}>
      <header className='fixed sm:static flex justify-between w-full bg-gradient-to-r from-deluxe-yellow-secondary/70 to-deluxe-yellow-secondary/80 sm:rounded-t-lg'>
        <span className='bg-deluxe-yellow-secondary py-1 px-2 rounded-t-lg text-white font-medium text-lg'>
          {dev.name}
        </span>
        <button onClick={closeModal} className='px-3'>
          X
        </button>
      </header>
      <iframe className='h-screen w-screen sm:w-[100%] sm:h-[100%] sm:rounded-b-lg col-span-3' src={dev.view_url} allowFullScreen allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr' />
    </section>
  )
}
