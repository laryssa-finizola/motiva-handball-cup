import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'

// Estilo de cada card do bento, na ordem das categorias (a última, a mais velha, é o destaque)
const CARD_STYLES = [
  'bg-[#111] text-white', // Pré-mirim
  'bg-[#F4F2EE] text-[#111]', // Mirim
  'bg-brand-dark-blue text-white', // Infantil
  'bg-[#F4F2EE] text-[#111]', // Cadete
]

export function CategoriesSection() {
  const highlight = CATEGORIES[CATEGORIES.length - 1]
  const others = CATEGORIES.slice(0, -1)

  return (
    <section id="categorias" className="bg-white py-20 font-sans text-[#111] md:py-28">
      <div className="container mx-auto flex flex-col gap-10 px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C75A00]">Quem joga</span>
            <h2 className="font-anton text-[clamp(3.5rem,8vw,7.5rem)] uppercase leading-[0.88]">Categorias</h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-[#444]">
            Do pré-mirim ao juvenil. As faixas etárias de cada categoria estão no regulamento.
          </p>
        </div>

        <div className="grid auto-rows-[180px] gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
          {/* destaque */}
          <a
            href="#inscricao"
            className="group relative flex flex-col justify-end overflow-hidden rounded-[24px] bg-brand-orange p-7 text-brand-dark-blue sm:col-span-2 lg:row-span-2"
          >
            {/* foto no canto de cima, sem cobrir o nome da categoria */}
            <div className="absolute right-0 top-0 h-[58%] w-[58%] overflow-hidden rounded-bl-[20px]">
              <Image
                src="/images/gallery/destaques-edicao1.jpg"
                alt="Equipes de handebol reunidas na quadra da Copa Motiva"
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover grayscale transition duration-500 group-hover:scale-105"
              />
            </div>
            <span className="relative z-10 font-anton text-[clamp(4rem,8vw,6.5rem)] uppercase leading-none">
              {highlight}
            </span>
          </a>

          {others.map((name, i) => (
            <a
              key={name}
              href="#inscricao"
              className={`group flex flex-col justify-between rounded-[24px] p-7 transition-transform hover:-translate-y-1 ${CARD_STYLES[i]}`}
            >
              <ArrowRight
                className="h-5 w-5 self-end opacity-60 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
              <span className="font-anton text-5xl uppercase leading-none">{name}</span>
            </a>
          ))}
        </div>

        <a
          href="/docs/regulamento.pdf"
          download
          className="inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-bold uppercase tracking-wide text-[#C75A00] hover:text-[#111]"
        >
          Ver faixas etárias no regulamento
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
