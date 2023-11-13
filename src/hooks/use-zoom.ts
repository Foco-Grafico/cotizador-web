import { useEffect, useState, useRef } from 'react'

export default function useZoom () {
  const [zoom, setZoom] = useState({
    toggle: false,
    x: 0,
    y: 0
  })
  const zoomEl = useRef<HTMLElement>()
  const zoomSupport = useRef<HTMLElement>()

  useEffect(() => {
    zoomEl.current?.style.setProperty('transition', 'transform 0.1s ease-out')
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
      zoomEl.current?.style.removeProperty('transition')

      const boundingRect = zoomSupport.current?.getBoundingClientRect()
      if (boundingRect == null) return

      const scaleRegex = /scale\((\d+\.?\d*)\)/
      const scale = Number(scaleRegex.exec(zoomEl.current?.style.transform ?? '')?.[1])

      const transform = calculateTransform({
        boundingRect,
        mouseX: e.clientX,
        mouseY: e.clientY,
        scaleFactor: (isNaN(scale) || scale <= limit) ? limit : scale
      })

      zoomEl.current?.style.setProperty('transform', transform)
    }

    const wheelEvent = (e: WheelEvent) => {
      const scaleRegex = /scale\((\d+\.?\d*)\)/

      const scale = Number(scaleRegex.exec(zoomEl.current?.style.transform ?? '')?.[1])

      if (isNaN(scale)) return

      const boundingRect = zoomSupport.current?.getBoundingClientRect()
      if (boundingRect == null) return

      const transform = calculateTransform({
        boundingRect,
        mouseX: e.clientX,
        mouseY: e.clientY,
        scaleFactor: (scale - (e.deltaY / 1000)) < limit ? limit : (scale - (e.deltaY / 1000))
      })

      zoomEl.current?.style.setProperty('transform', transform)
    }

    if (zoom.toggle) {
      const boundingRect = zoomSupport.current?.getBoundingClientRect()
      if (boundingRect == null) return

      const transform = calculateTransform({
        boundingRect,
        mouseX: zoom.x,
        mouseY: zoom.y,
        scaleFactor: limit
      })

      zoomEl.current?.style.setProperty('transform', transform)

      window.addEventListener('wheel', wheelEvent)
      window.addEventListener('mousemove', mouseMoveEvent)
    } else {
      window.removeEventListener('mousemove', mouseMoveEvent)
      window.removeEventListener('wheel', wheelEvent)
      zoomEl.current?.style.setProperty('transform', 'translateX(0) translateY(0) scale(1)')
    }

    return () => {
      window.removeEventListener('mousemove', mouseMoveEvent)
      window.removeEventListener('wheel', wheelEvent)
    }
  }, [zoom, zoomEl, zoomSupport])

  return {
    setZoom,
    zoomEl,
    zoomSupport,
    zoom
  }
}
