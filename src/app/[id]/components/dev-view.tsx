'use client'
import { Dev } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from '@/app/[id]/components/batch-list.module.css'

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
    <div className={`absolute w-screen h-screen overflow-hidden backdrop-blur-md inset-0 z-10 grid place-content-center ${styles.modal}`}>
      <div className='flex justify-between w-full pr-1'>
        {dev.name}
        <button onClick={closeModal}>
          X
        </button>
      </div>
      <iframe className='w-[100rem] h-[50rem]' src={dev.view_url} allowFullScreen allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr' />
    </div>
  )
}
