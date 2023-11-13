import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'

export const montserrat = Montserrat({
  subsets: ['latin']
})

export const futuraBold = localFont({
  src: './futura-bt-bold.woff2'
})

export const futura = localFont({
  src: './futura-bt.woff2'
})
