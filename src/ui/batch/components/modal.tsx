import { useState } from 'react'

interface Props {
  imagen: string
}

export default function Modal ({ imagen }: Props) {
  const [active, setActive] = useState(false)

  const handleModal = () => {
    setActive(prev => !prev)
  }

  return (
  // <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md' onClick={closeModal}>
    <div className='animate-slide-up bg-white p-5 border-2 border-gray-800 w-3/4'>
      <span className='float-right cursor-pointer' onClick={handleModal}>&times;</span>
    </div>
  // </div>
  )
}
