'use client'

import Link from 'next/link'
import styles from '@/ui/sidebar/sidebar.module.css'
import { usePathname } from 'next/navigation'
import { API_URL } from '@/utils/fetch-data'

interface Props {
  item: {
    name: string
    icon: string
    path: `/${string}`
  }
}

export const ListElement = ({ item }: Props) => {
  const path = usePathname()
  const isPath = path === item.path
  const url = item.icon.startsWith('http') ? item.icon : `${API_URL}/${item.icon}`

  return (
    <Link href={`${item.path}?page=1`} className={`${styles.lielement} ${isPath ? styles.selected : ''}`}>
      <div className={styles.liImgContainer}>
        <img src={url} alt={item.name} width={25} height={25} />
      </div>
      <span className={styles.litext}>{item.name}</span>
    </Link>
  )
}
