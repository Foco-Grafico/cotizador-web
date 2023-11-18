'use client'
import { IconArrowSquare } from '@/assets/svgs/icons'
import type { Filters as FilterType, StatusWithKey } from '@/types'
import styles from '@/ui/filter/filter.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { RangeSelector } from '../components/range'

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>
  maxBlocks: number
  batchTypes: StatusWithKey[]
}

export const Filters = ({ setFilters, maxBlocks = 1, batchTypes }: Props) => {
  const [isActive, setIsActive] = useState(false)
  const arrow = useRef<HTMLSpanElement>(null)
  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()

  const handleToggle = () => {
    setIsActive(prev => {
      const newState = !prev

      if (newState) {
        arrow.current?.classList.add(styles.rotate)
      } else {
        arrow.current?.classList.remove(styles.rotate)
      }

      return newState
    })
  }

  const handleChangeFilter = (
    operators?: string[],
    rules?: {
      specialOperator: {
        value: string
        operator: string
      }
    }
  ) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

    const searchParams = new URLSearchParams(params.toString())

    searchParams.set('page', '1')

    router.push(`${pathname}?${searchParams.toString()}`)

    const filter = (() => {
      if (operators == null) return value === 'none' ? null : value

      if (rules != null) {
        const { specialOperator } = rules

        if (specialOperator.value === value) {
          return [{
            operator: specialOperator.operator,
            value
          }]
        }
      }

      const values = value.split(',')

      return values.map((v, i) => ({
        operator: operators[i],
        value: v
      }))
    })()

    setFilters(prev => ({ ...prev, [name]: filter }))
  }

  const handleRangeChange = (value: { min: number, max: number }) => {
    console.log(value)
  }

  return (
    <section className=''>
      <button className='flex justify-center items-center bg-[#e5e5e569] hover:bg-[#e5e5e5b7] transition-colors px-3 gap-3 text-deluxe-yellow-secondary font-medium rounded-md' onClick={handleToggle}>
        Filtrar <span className={styles.arrow} ref={arrow}><IconArrowSquare height={14} /></span>
      </button>
      <div className='h-[0.05rem] w-full bg-[#7f7f7f8a] m-[0.50rem]' />
      {isActive && (
        <form className={styles.borderoptions}>
          <select onChange={handleChangeFilter()} name='block'>
            <option value='none'>Ubicación</option>
            {Array.from({ length: maxBlocks }, (_, i) => <option key={i} value={i + 1}>M-{i + 1}</option>)}
          </select>
          <select name='type' onChange={handleChangeFilter()}>
            <option value='none'>
              Tipo
            </option>
            {batchTypes.map(({ id, key, name }) => (
              <option key={key} value={id}>{name}</option>
            ))}
          </select>
          <select
            name='sqm'
            className='outline-none '
            onChange={handleChangeFilter(['>=', '<='], {
              specialOperator: {
                value: '400',
                operator: '>'
              }
            })}
          >
            <option value='none'>
              M2
            </option>
            <option value='0,100'>0 - 100</option>
            <option value='101,200'>101 - 200</option>
            <option value='201,300'>201 - 300</option>
            <option value='301,400'>301 - 400</option>
            <option value='400'>{'>'} 400</option>
          </select>
          <RangeSelector onChange={handleRangeChange} min={0} max={5000} />
        </form>
      )}
    </section>
  )
}
