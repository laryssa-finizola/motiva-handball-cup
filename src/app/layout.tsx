// src/app/layout.tsx
import type { Metadata } from 'next'
// 1. Importe as fontes novas
import { Inter, Bebas_Neue, Oswald } from 'next/font/google' 
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import './globals.css'


const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
})

// 3. Configure as fontes novas
const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'], 
  variable: '--font-bebas-neue', 
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-oswald', 
})

export const metadata: Metadata = {
  title: 'Copa Motiva de Handebol',
  description: 'O maior torneio de handebol da Paraíba.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${bebas_neue.variable} ${oswald.variable}`}
      >
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