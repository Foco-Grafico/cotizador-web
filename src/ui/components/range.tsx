import { useRef, useState } from 'react'

interface Props {
  name: string
  min: number
  max: number
}

export const RangeSelector = ({ min, max, name }: Props) => {
  const bar = useRef<HTMLDivElement>(null)
  const pointOne = useRef<HTMLDivElement>(null)
  const pointTwo = useRef<HTMLDivElement>(null)

  const [minState, setMin] = useState(min)
  const [maxState, setMax] = useState(max)

  const handleChangeMinMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (isNaN(Number(value))) return

    const newValue = Number(value)

    if (newValue < min || newValue > max) return

    if (e.target.name === 'min') {
      setMin(newValue)
      console.log(calculatePercent(newValue))
    } else {
      setMax(newValue)
    }
  }

  const calculatePercent = (value: number) => {
    return (value * 100) / max
  }

  const calculateDistancePoint = (points: Array<React.RefObject<HTMLDivElement>>) => {
    const [pointOne, pointTwo] = points

    const distance = pointTwo.current?.offsetLeft ?? 0 - pointOne.current?.offsetLeft ?? 0

    return distance
  }

  return (
    <div
      className='flex flex-col items-center gap-2 w-56'
    >
      <div className='flex justify-center items-center gap-2 text-sm'>
        <InputMoney name='min' onChange={handleChangeMinMax} value={minState} />
        <span>-</span>
        <InputMoney name='max' onChange={handleChangeMinMax} value={maxState} />
      </div>
      <div className='relative w-full h-1 bg-slate-600/30 rounded-full' ref={bar}>
        <Point ref={pointOne} className='left-[0%]' />
        <Point ref={pointTwo} className='left-[100%]' />
      </div>
    </div>
  )
}

const InputMoney = ({ value, onChange, name }: { name: string, value: any, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div>
      $<input name={name} value={value} onChange={onChange} className='w-16 border-b border-black outline-none px-2' />
    </div>
  )
}

const Point = ({ ref, className = '' }: { ref: React.RefObject<HTMLDivElement>, className?: string }) => {
  return (
    <div
      ref={ref}
      className={`absolute h-4 w-4 rounded-full inset-0 top-[-0.4rem] bg-zinc-500/80 transition-all ${className}`}
    />
  )
}
