import styles from '@/ui/sidebar/sidebar.module.css'
import { ListElement } from '@/ui/sidebar/components/list-element.component'
import { LogoDeluxe } from '@/assets/svgs/logos'
import { IconDeluxe } from '@/assets/svgs/icons'
import { API_URL, DEVS_ENDPOINTS } from '@/utils/fetch-data'
import { Dev } from '@/types'

export const SideBar = async () => {
  const res = await fetch(DEVS_ENDPOINTS.all, {
    cache: 'no-cache'
  })
  const data = res.ok ? (await res.json()).data as Dev[] : []

  return (
    <aside className={styles.sidebar}>
      <header className={`w-full flex flex-col items-center justify-center overflow-hidden relative h-16 ${styles.header}`}>
        <LogoDeluxe className={`${styles.logo} absolute w-full px-3`} />
        <IconDeluxe className={`${styles.icon} absolute w-[50%]`} />
      </header>
      <section className='w-full px-12 mb-3'>
        <div className='h-1 border-t border-t-[#cca249]' />
      </section>
      <section>
        <h1 className={`${styles.sectitle} text-[#a06a36] text-2xl font-semibold ml-5`}>
          Desarrollos
        </h1>
        {res.ok && (
          <ul className={styles.list}>
            {data.map((item) => (
              <ListElement
                key={item.key}
                item={{
                  icon: `${API_URL}/${item.logo_url}`,
                  name: item.name,
                  path: `/${Number(item.id).toString()}`
                }}
              />
            ))}
          </ul>
        )}
      </section>
    </aside>
  )
}
