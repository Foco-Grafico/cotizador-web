'use client'
import styles from '@/ui/screenlogin/screenlogin.module.css'

export const ScreenLogin = () => {
  return (
    <section>
      <form className={styles.content}>
        <header>
          <img className={styles.images} src='/logos/deluxe.png' width={2663} height={791} alt='logo de deluxe contructora' />
        </header>
        <input type='text' placeholder='Usuario ' className={styles.borders} />
        <input type='password' placeholder='Contraseña' className={styles.borders} />
      </form>
    </section>
  )
}
