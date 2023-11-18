import { useRef, useState } from 'react'

interface Props {
  min: number
  max: number
  onChange?: ({ max, min }: { min: number, max: number }) => void
}

export const RangeSelector = ({ min, max, onChange }: Props) => {
  const bar = useRef<HTMLDivElement>(null)
  const pointOne = useRef<HTMLDivElement>(null)
  const pointTwo = useRef<HTMLDivElement>(null)
  const [selectedPoint, setSelectedPoint] = useState<React.RefObject<HTMLDivElement> | null>(null)

  const [minState, setMin] = useState(min)
  const [maxState, setMax] = useState(max)

  const handleChangeMinMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    const type = name as 'min' | 'max'

    if (isNaN(Number(value))) return

    const newValue = Number(value)

    if (newValue < min || newValue > max) return

    const pointCurr = getPoint([pointOne, pointTwo], {
      type: type === 'min' ? 'min' : 'max',
      preference: type === 'min' ? 0 : 1
    })

    const pointPrev = getPoint([pointOne, pointTwo], {
      type: type === 'min' ? 'max' : 'min',
      preference: type === 'min' ? 1 : 0
    })

    if (pointCurr == null || pointPrev == null) return

    pointCurr.current?.style.setProperty('transition', 'left 0.2s ease-in-out')
    pointPrev.current?.style.setProperty('transition', 'left 0.2s ease-in-out')

    const percent = calculatePercent(newValue)

    pointCurr.current?.style.setProperty('left', `${percent}%`)

    const percentPrev = calculatePercent(type === 'min' ? maxState : minState)

    pointPrev.current?.style.setProperty('left', `${percentPrev}%`)

    onChange?.({
      min: type === 'min' ? newValue : minState,
      max: type === 'max' ? newValue : maxState
    })

    if (type === 'min') {
      setMin(newValue)
    } else {
      setMax(newValue)
    }
  }

  const getPoint = (points: Array<React.RefObject<HTMLDivElement> | null>, { type, preference }: { type: 'max' | 'min', preference?: number }) => {
    const condition = type === 'min'
      ? (prev: number, curr: number) => prev < curr
      : (prev: number, curr: number) => prev > curr

    return points.reduce((prev, curr) => {
      if (prev?.current == null) return curr
      if (curr?.current == null) return prev

      if (prev.current.offsetLeft === curr.current.offsetLeft && preference != null) return points[preference]
      if (prev.current.offsetLeft === curr.current.offsetLeft) return null

      if (condition(prev.current.offsetLeft, curr.current.offsetLeft)) return prev

      return curr
    })
  }

  const calculatePercent = (value: number) => {
    return (value * 100) / max
  }

  const handleClickInput = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const textLength = e.currentTarget.value.length

    e.currentTarget.setSelectionRange(textLength, textLength)
  }

  const getMouseHoldInfo = (e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX } = e

    const barBounding = bar.current?.getBoundingClientRect()

    if (barBounding == null) return

    const { left, width } = barBounding

    const percent = ((clientX - left) * 100) / width

    const percentFormatted = percent > 100 ? 100 : percent < 3.58 ? 3.58 : percent

    const isMin = Math.abs(percentFormatted - calculatePercent(minState)) < Math.abs(percentFormatted - calculatePercent(maxState))

    let point

    if (selectedPoint == null) {
      point = getPoint([pointOne, pointTwo], {
        type: isMin ? 'min' : 'max'
      })
      setSelectedPoint(point)
    } else {
      point = selectedPoint
    }

    if (point == null) return

    if (point.current == null) return

    const pointPercent = ((percentFormatted * 100) / 100) - ((point.current.offsetWidth) * 50) / width

    return { mousePercent: pointPercent, isMin, point }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const info = getMouseHoldInfo(e)
    if (info == null) return

    const { mousePercent, point } = info

    point.current?.style.setProperty('left', `${mousePercent}%`)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseUp = () => {
    setSelectedPoint(null)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const info = getMouseHoldInfo(e)
    if (info == null) return
    const { mousePercent, isMin, point } = info

    point.current?.style.setProperty('left', `${mousePercent}%`)
    point.current?.style.setProperty('transition', 'none')

    const newValue = (mousePercent * max) / 100

    if (isMin) {
      setMin(newValue)
    } else {
      setMax(newValue)
    }

    onChange?.({
      min: isMin ? newValue : minState,
      max: isMin ? maxState : newValue
    })
  }

  return (
    <div
      className='flex flex-col items-center gap-2 w-56 select-none'
    >
      <div className='flex justify-center items-center gap-2 text-sm'>
        <InputMoney onClick={handleClickInput} name='min' onChange={handleChangeMinMax} value={minState.toFixed(0)} />
        <span>-</span>
        <InputMoney onClick={handleClickInput} name='max' onChange={handleChangeMinMax} value={maxState.toFixed(0)} />
      </div>
      <div className='relative w-full h-1 bg-slate-600/30 rounded-full' ref={bar}>
        <Point onMouseDown={handleMouseDown} reference={pointOne} className='left-[0%]' />
        <Point onMouseDown={handleMouseDown} reference={pointTwo} className='left-[100%]' />
      </div>
    </div>
  )
}

const InputMoney = ({ value, onChange, name, onClick }: { name: string, onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void, value: any, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div>
      $<input onClick={onClick} name={name} value={value} onChange={onChange} className='w-16 border-b border-black outline-none px-2' />
    </div>
  )
}

const Point = ({ reference, className = '', onMouseDown }: {
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  reference: React.RefObject<HTMLDivElement>
  className?: string
}) => {
  return (
    <div
      ref={reference}
      onMouseDown={onMouseDown}
      className={`absolute h-4 w-4 rounded-full inset-0 top-[-0.4rem] bg-zinc-500/80 ${className}`}
    />
  )
}
