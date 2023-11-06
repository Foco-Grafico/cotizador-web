import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SideBar } from '@/ui/sidebar/sidebar.component'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cotizador Instantaneo',
  description: 'Grupo Deluxe Marina - Construccion E Inmboliaria',
  applicationName: 'Grupo Deluxe Marina'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={`${inter.className} flex`}>
        <SideBar />
        {children}
      </body>
    </html>
  )
}
