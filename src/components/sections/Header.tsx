'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { AnnouncementBar } from './AnnouncementBar'

import { EVENT, whatsappLink } from '@/lib/constants'

const NAV_LINKS = [
  { href: '/#sobre', label: 'A Copa' },
  { href: '/#categorias', label: 'Categorias' },
  { href: '/#agenda', label: 'Agenda' },
  { href: '/#edicoes-anteriores', label: 'Edições' },
  { href: '/#contato', label: 'Contato' },
]

const whatsappUrl = whatsappLink(`Olá! Gostaria de realizar a inscrição na Copa Motiva de Handebol ${EVENT.nextYear}.`)

const CTA_CLASSES =
  'inline-flex items-center justify-center rounded-full bg-brand-orange font-sans font-bold uppercase tracking-wide text-brand-dark-blue transition-transform hover:scale-105'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setIsMenuOpen(false)

  return (
    <>
      {/* a faixa rola junto com a página; só o cabeçalho abaixo fica fixo */}
      <AnnouncementBar />
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-dark-blue font-sans text-white">
        <nav className="container mx-auto flex h-20 items-center justify-between gap-4 px-4" aria-label="Principal">
          {/* Logo + nome */}
          <Link href="/" onClick={close} className="flex items-center gap-3">
            <Image src="/images/logo-copa-motiva.png" alt="" width={52} height={55} priority className="h-[52px] w-auto" />
            <span className="hidden font-anton text-2xl uppercase leading-none tracking-[0.01em] sm:inline">
              Copa Motiva
              <span className="sr-only"> de Handebol — página inicial</span>
            </span>
            <span className="sr-only sm:hidden">Copa Motiva de Handebol — página inicial</span>
          </Link>

          {/* Links (a partir de 1024px) */}
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-sm font-bold uppercase tracking-[0.06em] transition-colors hover:text-brand-orange ${
                      isActive ? 'text-brand-orange' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${CTA_CLASSES} min-h-[44px] px-5 text-xs sm:px-6 sm:text-sm`}
            >
              Inscreva sua equipe
            </Link>

            {/* Menu hambúrguer (abaixo de 1024px) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30 lg:hidden"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              aria-controls="menu-mobile"
            >
              {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div id="menu-mobile" className="absolute inset-x-0 top-full border-b border-white/10 bg-brand-dark-blue shadow-2xl lg:hidden">
            <ul className="container mx-auto flex flex-col px-4 py-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-white/10 last:border-b-0">
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex min-h-[56px] items-center font-anton text-3xl uppercase leading-none transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
