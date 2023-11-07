'use client'
import styles from '@/ui/filter/filter.module.css'
import { useState } from 'react'

export const Filters = () => {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => setIsActive(prev => !prev)
  return (
    <section className=''>
      <button className={styles.filterbutton} onClick={handleToggle}>
        Filtrar
      </button>
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
