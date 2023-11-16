'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const DevViewButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const handleClick = () => {
    const searchParams = new URLSearchParams(params.toString())

    if (searchParams.has('devview')) {
      searchParams.delete('devview')
      router.push(`${pathname}?${searchParams.toString()}`)
      return
    }

    searchParams.set('devview', 'true')

    router.push(`${pathname}?${searchParams.toString()}`)
  }

  return (
    <button onClick={handleClick} className='text-white text-xl rounded-md bg-[#035a54] px-2'>Ver recorrido 360°</button>
  )
}
