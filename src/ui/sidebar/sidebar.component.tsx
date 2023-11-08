import styles from '@/ui/sidebar/sidebar.module.css'
import { ListElement } from '@/ui/sidebar/components/list-element.component'

export const SideBar = () => {
  return (
    <aside className={styles.sidebar}>
      <header className='w-full flex flex-col justify-center items-center mb-2 px-6 py-6 gap-6'>
        <img src='/logos/deluxe.png' alt='Logo de la empresa' width={2663} height={791} className={styles.logo} />
        <div className='border-b w-[50%] border-b-[#d1a45d]' />
      </header>
      <h1 className={`${styles.elhidden} text-[#d1a45d] text-2xl ml-5`}>
        Desarrollos
      </h1>
      <ul>
        <ListElement
          item={{
            name: 'Deluxe Marina',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1024px-Flat_tick_icon.svg.png',
            path: '/deluxe-marina'
          }}
        />
      </ul>
    </aside>
  )
}