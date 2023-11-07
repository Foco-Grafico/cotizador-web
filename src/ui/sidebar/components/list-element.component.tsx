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
    <Link href={item.path} className='flex gap-1 items-center'>
      <img src={item.icon} alt={item.name} width={25} height={25} />
      <span className={styles.litext}>{item.name}</span>
    </Link>
  )
}
