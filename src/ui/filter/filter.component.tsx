'use client'

import { IconArrowSquare } from '@/assets/svgs/icons'
import styles from '@/ui/filter/filter.module.css'
import { useState } from 'react'

export const Filters = () => {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => setIsActive(prev => {
    const invert = !prev
    if (invert) {
      document.body.style.overflow = 'hidden'
    }
    return invert
  })

  return (
    <section className=''>
      <button className={styles.filterbutton} onClick={handleToggle}>
        Filtrar <IconArrowSquare className={styles.icon} />
      </button>
      <div className='h-[0.05rem] w-full bg-[#7f7f7f8a] m-[0.50rem]' />
      {isActive && (
        <section className={styles.borderoptions}>
          <select className={styles.Estado}>
            <option value='Estatus'>Estatus</option>
          </select>
          <select className={styles.Precio}>
            <option value='Precio'>Precio</option>
          </select>
          <select className={styles.Ubicacion}>
            <option value='Ubicacion'>Ubicación</option>
          </select>
          <select className={styles.M2}>
            <option value='M2'>M2</option>
          </select>
        </section>
      )}
    </section>
  )
}