import Link from 'next/link'
import styles from '@/ui/sidebar/sidebar.module.css'

interface Props {
  item: {
    name: string
    icon: string
    path: `/${string}`
  }
}

export const ListElement = ({ item }: Props) => {
  return (
    <Link href={item.path} className='flex gap-1'>
      <img src={item.icon} alt={item.name} width={50} height={50} />
      <span className={styles.litext}>{item.name}</span>
    </Link>
  )
}
