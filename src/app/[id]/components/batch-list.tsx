'use client'

import useBatches from '@/hooks/use-batches'
import BatchInfo from '@/ui/batch/batch.component'
import { API_URL } from '@/utils/fetch-data'
import { useEffect, useRef, useState } from 'react'
import styles from './batch-list.module.css'

interface Props {
  devID: number | string
}

export const BatchList = ({ devID }: Props) => {
  const { batches, error, loading, nextPage, prevPage, page } = useBatches({ devID })
  const [url, setUrl] = useState('')
  const [toggle, setToggle] = useState(false)
  const [zoom, setZoomToggle] = useState({
    toggle: false,
    x: 0,
    y: 0
  })
  const img = useRef<HTMLElement>()
  const squareImage = useRef<HTMLElement>()

  const showModal = (url: string) => () => {
    setUrl(url)
    setToggle(true)
  }

  const closeModal = () => {
    if (zoom.toggle) {
      toggleZoom()
      return
    }

    setUrl('')
    setToggle(false)
    setZoomToggle(prev => ({ ...prev, toggle: false }))
  }

  const toggleZoom = (e?: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e?.stopPropagation()

    setZoomToggle(prev => ({ x: e?.clientX ?? 0, y: e?.clientY ?? 0, toggle: !prev.toggle }))
  }

  useEffect(() => {
    img.current?.style.setProperty('transition', 'transform 0.1s ease-out')
    const limit = 1.5

    const calculateTransform = (
      {
        boundingRect,
        mouseX,
        mouseY,
        scaleFactor
      }: {
        mouseX: number
        mouseY: number
        boundingRect: DOMRect
        scaleFactor: number
      }
    ) => {
      const x = mouseX - boundingRect.left
      const y = mouseY - boundingRect.top

      const translateX = (x - boundingRect.width / 2)
      const translateY = (y - boundingRect.height / 2)

      const transform = `translateX(${translateX < 0 ? '' : '-'}${translateX < 0 ? (translateX - (translateX * 2)).toFixed(2) : translateX.toFixed(2)}px) translateY(${translateY < 0 ? '' : '-'}${translateY < 0 ? (translateY - (translateY * 2)).toFixed(2) : translateY.toFixed(2)}px) scale(${scaleFactor})`

      return transform
    }

    const mouseMoveEvent = (e: MouseEvent) => {
      img.current?.style.removeProperty('transition')

      const boundingRect = squareImage.current?.getBoundingClientRect()
      if (boundingRect == null) return

      const scaleRegex = /scale\((\d+\.?\d*)\)/
      const scale = Number(scaleRegex.exec(img.current?.style.transform ?? '')?.[1])

      const transform = calculateTransform({
        boundingRect,
        mouseX: e.clientX,
        mouseY: e.clientY,
        scaleFactor: (isNaN(scale) || scale <= limit) ? limit : scale
      })

      img.current?.style.setProperty('transform', transform)
    }

    const wheelEvent = (e: WheelEvent) => {
      const scaleRegex = /scale\((\d+\.?\d*)\)/

      const scale = Number(scaleRegex.exec(img.current?.style.transform ?? '')?.[1])

      if (isNaN(scale)) return

      const boundingRect = squareImage.current?.getBoundingClientRect()
      if (boundingRect == null) return

      const transform = calculateTransform({
        boundingRect,
        mouseX: e.clientX,
        mouseY: e.clientY,
        scaleFactor: (scale - (e.deltaY / 1000)) < limit ? limit : (scale - (e.deltaY / 1000))
      })

      img.current?.style.setProperty('transform', transform)
    }

    if (zoom.toggle) {
      const boundingRect = squareImage.current?.getBoundingClientRect()
      if (boundingRect == null) return

      const transform = calculateTransform({
        boundingRect,
        mouseX: zoom.x,
        mouseY: zoom.y,
        scaleFactor: limit
      })

      img.current?.style.setProperty('transform', transform)

      window.addEventListener('wheel', wheelEvent)
      window.addEventListener('mousemove', mouseMoveEvent)
    } else {
      window.removeEventListener('mousemove', mouseMoveEvent)
      window.removeEventListener('wheel', wheelEvent)
      img.current?.style.setProperty('transform', 'translateX(0) translateY(0) scale(1)')
    }

    return () => {
      window.removeEventListener('mousemove', mouseMoveEvent)
      window.removeEventListener('wheel', wheelEvent)
    }
  }, [zoom])

  return (
    <>
      <section className='w-[60rem] h-full flex flex-col'>
        <div className={`overflow-y-auto flex-1 w-full flex flex-col gap-3 px-1 ${styles.batchList}`}>
          {loading && <span className='w-full flex justify-center items-center'>Loading...</span>}
          {error != null && <span className='w-full flex justify-center items-center'>{error.message}</span>}
          {!loading && batches.map((batch) => (
            <BatchInfo imgClick={showModal} key={batch.id} index={batch.id} m2={batch.sq_m} currency={batch.currency} price={batch.price} status={batch.status.name} location={batch.location} image={`${API_URL}/${batch.assets[0].asset_url}`} />
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
          <article ref={squareImage} className='bg-white p-7 rounded-lg cursor-pointer'>
            <img
              ref={img}
              onClick={toggleZoom}
              src={url}
              alt={url}
              width={850}
              height={550}
            />
          </article>
        </section>
      )}
    </>
  )
}
