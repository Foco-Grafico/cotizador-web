import type { Metadata } from 'next'
import './globals.css'
import { SideBar } from '@/ui/sidebar/sidebar.component'
import { futura } from '@/assets/fonts'

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
      <body className={`${futura.className} h-screen flex`}>
        <SideBar />
        {children}
      </body>
    </html>
  )
}
