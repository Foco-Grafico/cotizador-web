'use client'
import { IconArrowSquare } from '@/assets/svgs/icons'
import type { Filters as FilterType } from '@/types'
import styles from '@/ui/filter/filter.module.css'
import { useRef, useState } from 'react'

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>
}

export const Filters = ({ setFilters }: Props) => {
  const [isActive, setIsActive] = useState(false)
  const arrow = useRef<HTMLElement>()

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
          <select className={styles.Precio}>
            <option value='Precio'>Precio</option>
          </select>
          <select className={styles.Ubicacion}>
            <option value='Ubicacion'>Ubicación</option>
          </select>
          <select className={styles.M2}>
            <option value='M2'>M2</option>
          </select>
        </form>
      )}
    </section>
  )
}
