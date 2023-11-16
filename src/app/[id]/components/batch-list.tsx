'use client'

import useBatches from '@/hooks/use-batches'
import BatchInfo from '@/ui/batch/batch.component'
import { useState } from 'react'
import styles from './batch-list.module.css'
import useZoom from '@/hooks/use-zoom'
import { Filters } from '@/ui/filter/filter.component'
import { MainHeader } from '@/ui/mainHeader/mainHeader.component'
import { useSearchParams } from 'next/navigation'

interface Props {
  devID: number | string
  hasView: boolean
}

export const BatchList = ({ devID, hasView }: Props) => {
  const { batches, error, loading, nextPage, prevPage, page, setFilters } = useBatches({ devID })
  const [url, setUrl] = useState('')
  const [toggle, setToggle] = useState(false)
  const { setZoom, zoomEl, zoomSupport, zoom } = useZoom()
  const devName = useSearchParams().get('name') ?? ''

  const showModal = (url: string) => () => {
    setUrl(url)
    setToggle(true)

    window.addEventListener('keydown', closeModal)
  }

  const closeModal = (e?: KeyboardEvent) => {
    if (e?.key != null && e.key !== 'Escape') return

    if (zoom.toggle) {
      toggleZoom()
      return
    }

    setUrl('')
    setToggle(false)
    setZoom(prev => ({ ...prev, toggle: false }))
  }

  const toggleZoom = (e?: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e?.stopPropagation()

    setZoom(prev => ({ x: e?.clientX ?? 0, y: e?.clientY ?? 0, toggle: !prev.toggle }))
  }

  return (
    <>
      <section className='w-[60rem] h-full flex flex-col'>
        <MainHeader hasView={hasView} desarrollo={devName} />
        <Filters setFilters={setFilters} />
        <div className={`overflow-y-auto flex-1 w-full flex flex-col gap-3 px-1 ${styles.batchList}`}>
          {loading && <span className='w-full flex justify-center items-center'>Loading...</span>}
          {error != null && <span className='w-full flex justify-center items-center'>{error.message}</span>}
          {!loading && batches.map((batch) => (
            <BatchInfo imgClick={showModal} key={batch.id} index={batch.id} m2={batch.sq_m} currency={batch.currency} price={batch.price} status={batch.status.name} location={batch.location} image={batch.assets[0].asset_url} />
          ))}
        </div>
        <div className='flex justify-center items-center gap-3'>
          <button onClick={prevPage}>prev</button>
          <span>{page}</span>
          <button onClick={nextPage}>next</button>
        </div>
      </section>
      {toggle && (
        <section onClick={closeModal} className={`absolute inset-0 w-screen h-screen bg-[#0000003a] grid place-content-center backdrop-blur-md ${styles.modal} overflow-hidden`}>
          <span className='absolute right-20 top-10 text-xl cursor-pointer'>X</span>
          <picture ref={zoomSupport} className='p-7 rounded-lg cursor-pointer'>
            <img
              className={zoom.toggle ? 'cursor-zoom-out' : 'cursor-zoom-in'}
              ref={zoomEl}
              onClick={toggleZoom}
              src={url}
              alt={url}
              width={850}
              height={550}
            />
          </picture>
        </section>
      )}
    </>
  )
}
