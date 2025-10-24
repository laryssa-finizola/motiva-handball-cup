// src/components/HeroSection.tsx
import Link from 'next/link';
import { Calendar } from 'lucide-react'; // Lembre-se: npm install lucide-react

export function HeroSection() {
  return (
    <section>
      {/* =======================================
        Parte 1: Seção Principal (Azul/Imagem)
        =======================================
      */}
      <div
        className="relative flex min-h-[65vh] items-center justify-center py-20 px-8 text-center"
        style={{ backgroundImage: "url('/images/background-motiva.jpg')" }}
      >
        {/* Overlay escuro 
          Usando 'brand-dark-blue' do seu config com 90% de opacidade
        */}
        <div className="absolute inset-0 bg-brand-dark-blue/90 z-10" />

        {/* Wrapper do Conteúdo (acima do overlay) */}
        <div className="relative z-20">
          
          {/* Título Principal */}
          <h1 className="font-extrabold text-white">
            <div className="mb-2">
              {/* "III" em laranja */}
              <span className="text-brand-orange text-5xl md:text-6xl align-middle mr-6">
                III
              </span>
              <span className="text-6xl md:text-7xl align-middle tracking-tight">
                COPA MOTIVA
              </span>
            </div>
            {/* "de Handebol" */}
            <span className="text-4xl md:text-5xl font-bold tracking-wide">
              de Handebol
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mt-4 text-lg text-white/80">
            O maior torneio de handebol da Paraíba
          </p>

          {/* Botão de Ação */}
          <Link
            href="/inscricao" // Mude o link
            className="mt-8 inline-block rounded-full bg-blue-500 py-3 px-8 
                       font-semibold text-white transition-colors
                       hover:bg-blue-600"
          >
            {/* O texto do botão no design estava ilegível, usei "Saiba Mais" */}
            Saiba Mais
          </Link>
        </div>
      </div>

      {/* =======================================
        Parte 2: Barra de Informações (Laranja)
        =======================================
      */}
      <div 
        // Usando 'bg-brand-orange' do seu config
        className="flex flex-wrap items-center justify-between gap-6 bg-brand-orange 
                   py-6 px-8 md:px-12"
      >
        {/* Bloco da Data */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center 
                          rounded-lg bg-white/30 p-2">
            {/* Usando 'text-brand-dark-blue' do seu config para o ícone */}
            <Calendar size={28} className="text-brand-dark-blue" />
          </div>
          <span 
            // Usando 'text-brand-dark-blue' do seu config para o texto
            className="text-xl font-bold text-brand-dark-blue"
          >
            20 A 23 DE NOVEMBRO
          </span>
        </div>

        {/* Bloco de Links */}
        <nav className="flex items-center gap-6">
          <Link 
            href="#" 
            className="font-semibold text-brand-dark-blue transition-opacity 
                       hover:opacity-80"
          >
            SISAB MISS
          </Link>
          <Link 
            href="/edicoes-anteriores" 
            className="font-semibold text-brand-dark-blue transition-opacity 
                       hover:opacity-80"
          >
            EDITORES
          </Link>
        </nav>
      </div>
    </section>
  );
}