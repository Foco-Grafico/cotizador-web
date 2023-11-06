import styles from '@/ui/sidebar/sidebar.module.css'

export const SideBar = () => {
  return (
    <aside className={styles.sidebar}>
      <header className=''>
        <img src='/logos/deluxe.png' alt='Logo de la empresa' width={3543} height={3543} />
      </header>
    </aside>
  )
}
