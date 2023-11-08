'use client'
import { useState } from 'react'

interface Option {
  name: string
  value: any
}

interface Props {
  children: React.ReactNode
  options: Option[]
  onChange?: (value: any) => void
  className?: string
}

export default function Select ({ children, options, onChange, className }: Props) {
  const [active, setActive] = useState(false)
  const [name, setName] = useState<string | null>(null)

  const toggleActive = () => setActive(prev => !prev)

  const handleSelectedValue = (option: Option) => () => {
    setName(option.name)
    onChange?.(option.value)
    toggleActive()
  }

  return (
    <section className={className}>
      <button onClick={toggleActive} className='transition w-auto px-2'>
        <span className='font-black'>{name ?? children} </span>
      </button>
      {active && (
        <div className='flex flex-col gap-2'>
          {options.map((option, i) => (
            <div key={`${option.name}-${i}`} className=' hover:bg-blue-700 '>
              <div className='bg-[#e5e5e5]  w-24 rounded-lg px-2 font-bold  hover:bg-blue-700 hover:text-white'>
                <button onClick={handleSelectedValue(option)}>{option.name}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
