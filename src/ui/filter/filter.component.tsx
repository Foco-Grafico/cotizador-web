'use client'
import { IconArrowSquare } from '@/assets/svgs/icons'
import type { Filters as FilterType, StatusWithKey } from '@/types'
import styles from '@/ui/filter/filter.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

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

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

    const searchParams = new URLSearchParams(params.toString())

    searchParams.set('page', '1')

    router.push(`${pathname}?${searchParams.toString()}`)

    setFilters(prev => ({ ...prev, [name]: value === 'none' ? null : value }))
  }

  return (
    <section className=''>
      <button className='flex justify-center items-center bg-[#e5e5e569] hover:bg-[#e5e5e5b7] transition-colors px-3 gap-3 text-deluxe-yellow-secondary font-medium rounded-md' onClick={handleToggle}>
        Filtrar <span className={styles.arrow} ref={arrow}><IconArrowSquare height={14} /></span>
      </button>
      <div className='h-[0.05rem] w-full bg-[#7f7f7f8a] m-[0.50rem]' />
      {isActive && (
        <form className={styles.borderoptions}>
          <select onChange={handleChangeFilter} name='block'>
            <option value='none'>Ubicación</option>
            {Array.from({ length: maxBlocks }, (_, i) => <option key={i} value={i + 1}>M-{i + 1}</option>)}
          </select>
          <select name='type' onChange={handleChangeFilter}>
            <option value='none'>
              Tipo
            </option>
            {batchTypes.map(({ id, key, name }) => (
              <option key={key} value={id}>{name}</option>
            ))}
          </select>
        </form>
      )}
    </section>
  )
}
