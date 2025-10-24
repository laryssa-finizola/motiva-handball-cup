// src/components/Header.tsx (ou onde seu componente estiver)
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ThemeToggleButton } from '../ui/theme-toggle-button' // Verifique se este caminho está correto
import { Menu, X } from 'lucide-react'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Seus links, que fazem sentido para o seu projeto
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/sobre', label: 'SOBRE' },
    { href: '/edicoes-anteriores', label: 'EDIÇÕES ANTERIORES' },
    { href: '/contato', label: 'CONTATO' },
  ]

  return (
    // 1. O Header agora tem a cor de fundo e sombra (como na imagem)
    //    'sticky top-0 z-50' é opcional, mas recomendado
    <header className="sticky top-0 z-50 w-full bg-brand-dark-blue text-white shadow-md">
      {/* 2. O 'nav' continua centralizando o conteúdo */}
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* Logo (do seu código) */}
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/logo-copa-motiva.png" // Usando o seu logo
            alt="Logo Copa Motiva de Handebol"
            width={70}
            height={70}
            priority
          />
        </Link>

        {/* Links de Navegação (Desktop) 
            - 'hidden md:flex': Escondido no mobile, flex no desktop
        */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                // Lógica para destacar o link ativo
                className={`
                  font-medium transition-colors hover:text-brand-orange
                  ${isActive ? 'text-brand-orange' : 'text-white/90'}
                `}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Botões da Direita */}
        <div className="flex items-center gap-4">
          
          {/* Botão "Saiba Mais" (da imagem) - Apenas Desktop */}
          <Link
            href="/inscricao" // Mude este link se necessário
            className="hidden rounded-full bg-brand-orange px-6 py-2 
                       font-semibold text-white transition-transform 
                       hover:scale-105 md:block"
          >
            Saiba Mais
          </Link>

          {/* Botão de Tema (do seu código) */}
          <ThemeToggleButton />

          {/* Botão Hamburger (do seu código) - Apenas Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden" // Escondido no desktop
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile (Dropdown) - Esta parte estava faltando */}
      {isMenuOpen && (
        <div className="absolute w-full flex-col items-center gap-6
                      bg-brand-dark-blue pb-8 shadow-lg md:hidden">
          
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-center text-lg font-medium 
                         text-white/90 hover:text-brand-orange"
            >
              {link.label}
            </Link>
          ))}
          
          {/* Botão "Saiba Mais" no Mobile */}
          <Link
            href="/inscricao"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 inline-block rounded-full bg-brand-orange 
                       px-8 py-3 font-semibold text-white"
          >
            Saiba Mais
          </Link>
        </div>
      )}
    </header>
  )
}