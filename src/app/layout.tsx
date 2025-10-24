import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/sections/Header' // 1. Importar o Header
import { Footer } from '@/components/sections/Footer' // 2. Importar o Footer
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Você pode adicionar seus metadados aqui
export const metadata: Metadata = {
  title: 'Copa Motiva de Handebol',
  description: 'O maior torneio de handebol da região.',
}

// 3. Adicionar o { children } de volta
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          
          <main>{children}</main> 
          
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}