'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ThemeToggleButton } from '../ui/theme-toggle-button' 
import { Menu, X } from 'lucide-react'
import { INSCRICAO_CTA_CLASSES } from '@/lib/constants'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/#sobre', label: 'SOBRE' },
    { href: '/#edicoes-anteriores', label: 'EDIÇÕES ANTERIORES' },
    { href: '/contato', label: 'CONTATO' },
  ]

  // dados necessários para o botão de inscrição via WhatsApp
  const whatsappNumber = "558396595988"; 
  const message = encodeURIComponent("Olá! Gostaria de realizar a inscrição na Copa Motiva de Handebol 2025.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-dark-blue text-white shadow-md">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/images/logo-copa-motiva.png" 
            alt="Logo Copa Motiva de Handebol"
            width={70}
            height={70}
            priority
          />
        </Link>


        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
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
          
          {/* Botão CTA */}
            <div>
              <Link
                href={whatsappUrl}
                target="_blank"            
                rel="noopener noreferrer"    
                className={`${INSCRICAO_CTA_CLASSES} px-8 py-3 text-base font-semibold`}
              >
                INSCREVA-SE
              </Link>
            </div>

          {/* Botão de Tema */}
          <ThemeToggleButton />

          {/* Botão Hamburger - Apenas Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile (Dropdown) */}
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