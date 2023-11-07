'use client'
import styles from '@/ui/register-screen/register-screen.module.css'

export const RegisterScreen = () => {
  return (
    <section className={styles.register}>
      <form className='flex justify-center items-center flex-col gap-3'>
        <header className='w-80 overflow-hidden py-16 '>
          <img src='/logos/deluxe.png' width={2663} height={791} alt='logo de deluxe contructora' className='border' />
        </header>
        <input type='text' placeholder='Nombre' />
        <input type='email' placeholder='Correo' />
        <input type='text' placeholder='Whastapp' />
        <label className='flex gap-2'>
          <input type='checkbox' />
          <span>Quieres crear una cuenta para obtener los beneficios</span>
        </label>
        <button className='bg-[#015b53] text-[#fdfdfdfd] rounded px-2 py-0.5'>
          Descargar Cotización
        </button>
        Al descargar las cotizaciones aceptas las politicas de privacidad
      </form>
    </section>
  )
}
