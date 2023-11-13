'use client'
import styles from '@/ui/screenlogin/screenlogin.module.css'

export const ScreenLogin = () => {
  return (
    <section className='absolute overflow-x-hidden h-screen w-full grid place-content-center'>
      <form className={styles.content}>
        <header>
          <img className={styles.images} src='/logos/deluxe.png' width={2663} height={791} alt='logo de deluxe contructora' />
        </header>
        <input type='text' placeholder='Usuario ' className={styles.borders} />
        <input type='password' placeholder='Contraseña' className={styles.borders} />
        <button className={styles.buttonsesion}>
          Iniciar Sesion
        </button>
      </form>
      <b><p className={styles.textcreate}>¿No tienes cuenta? <a className='text-[#025c53]'>'¡Crea una ahora!</a></p></b>
      <a className={styles.textpassword}>Olivide la contraseña</a>
    </section>
  )
}
