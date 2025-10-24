// src/components/Footer.tsx

// 1. Adicionado 'use client' para o botão de rolagem
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// 2. Importando os ícones que precisamos
import { Youtube, Instagram, ChevronUp } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  // 3. Função para o botão de rolagem
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    // Container principal: fundo azul escuro, texto branco, padding
    <footer className="bg-brand-dark-blue text-white pt-16 pb-8">
      <div className="container mx-auto flex flex-col items-center px-4">
        
        {/* Logo (precisa estar em /public) */}
        <Link href="/">
          <Image
            // !! ATENÇÃO !!: Você precisará deste ícone laranja.
            // Coloquei um nome de exemplo. Ajuste o path.
            src="/logo-copa-motiva-icon.png"
            alt="Ícone Copa Motiva"
            width={56} // 56px
            height={56}
          />
        </Link>

        {/* Título */}
        <span className="mt-2 text-xl font-bold tracking-wider">
          COPA MOTIVA
        </span>

        {/* Links Sociais (replicando a imagem) */}
        <div className="mt-4 flex items-center gap-3">
          <Link
            href="https://youtube.com" // <-- Mude este link
            target="_blank"
            rel="noopener noreferrer"
            // Usando sua cor 'brand-orange'
            className="flex items-center gap-2 rounded-md bg-brand-orange 
                       py-2 px-4 text-sm font-semibold text-brand-dark-blue
                       transition-transform hover:scale-105"
          >
            <Youtube size={18} />
            {/* O texto na imagem era "FIBF" ou "YOUTUBE", usei o mais provável */}
            YOUTUBE
          </Link>
          <Link
            href="https://instagram.com" // <-- Mude este link
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-md bg-brand-orange 
                       p-2 font-semibold text-brand-dark-blue
                       transition-transform hover:scale-105"
          >
            {/* O ícone na imagem parecia o do Instagram ou Upload */}
            <Instagram size={22} />
          </Link>
        </div>

        {/* Botão de Rolar para Cima */}
        <button
          onClick={scrollToTop}
          aria-label="Rolar para o topo"
          // Usando sua cor 'brand-orange' para o ícone
          className="mt-10 text-brand-orange transition-transform 
                     hover:scale-125 focus:outline-none"
        >
          <ChevronUp size={24} />
        </button>

        {/* Linha de Copyright (usando seu texto original) */}
        <div className="mt-8 w-full border-t border-white/20 pt-6 text-center 
                      text-sm text-white/70">
          <p>
            {/* O texto na imagem era ilegível, então mantive o seu. */}
            &copy; {currentYear} Copa Motiva de Handebol. Todos os direitos reservados.
          </p>
        </div>
        
      </div>
    </footer>
  )
}