'use client'
import styles from '@/ui/register-screen/register-screen.module.css'
import { useState } from 'react'

export const RegisterScreen = () => {
  const [isActive, setIsActive] = useState(false)

  const clickCheckbox = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (e.currentTarget.checked) {
      setIsActive(true)
      return
    }
    setIsActive(false)
  }

  return (
    <section className={styles.register}>
      <form className='flex justify-center items-center flex-col gap-3'>
        <header className='w-80 overflow-hidden py-16 '>
          <img src='/logos/deluxe.png' width={2663} height={791} alt='logo de deluxe contructora' className='border' />
        </header>
        <input type='text' placeholder='Nombre ' className={styles.input} />
        <input type='email' placeholder='Correo' className={styles.input} />
        <input type='text' placeholder='Whastapp' className={styles.input} />
        {isActive && (
          <>
            <input type='text' placeholder='Usuario' className={styles.input} />
            <input type='password' placeholder='Contraseña' className={styles.input} />
          </>
        )}
        <label className='flex gap-2'>
          <input type='checkbox' onClick={clickCheckbox} />
          <p>Quieres crear una cuenta para obtener los <span className='text-[#cbaf73]'>beneficios</span></p>
        </label>
        <button className='bg-[#015b53] text-[#fdfdfdfd] rounded px-2 py-0.5'>
          Descargar Cotización
        </button>
        <p>Al descargar las cotizaciones aceptas las <span className='text-[#045b53]'>politicas de privacidad</span></p>
      </form>
    </section>
  )
}
