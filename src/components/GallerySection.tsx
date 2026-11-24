'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { EVENT, PAST_EDITIONS } from '@/lib/constants'

export function GallerySection() {
  const track = useRef<HTMLUListElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 420), behavior: 'smooth' })
  }

  return (
    // id para âncora do header
    <section id="edicoes-anteriores" className="overflow-hidden bg-brand-dark-blue py-20 font-sans text-white md:py-28">
      <div className="container mx-auto flex flex-col gap-10 px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">Nossa história</span>
            <h2 className="font-anton text-[clamp(3.5rem,8vw,7.5rem)] uppercase leading-[0.88]">
              Edições
              <br />
              <span className="text-transparent [-webkit-text-stroke:2px_#fff]">anteriores</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Edições mais recentes"
              className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-white/50 transition-colors hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Edições mais antigas"
              className="grid h-14 w-14 place-items-center rounded-full bg-brand-orange text-brand-dark-blue transition-transform hover:scale-105"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={track}
          className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* próxima edição */}
          <li className="w-[80%] shrink-0 snap-start sm:w-[340px]">
            <a
              href="#inscricao"
              className="flex h-[420px] flex-col justify-between rounded-[24px] bg-brand-orange p-7 text-brand-dark-blue transition-transform hover:-translate-y-1"
            >
              <span className="font-anton text-[5.5rem] leading-none sm:text-[7rem]">{EVENT.nextYear}</span>
              <span className="text-base font-bold leading-snug">
                A próxima história é da sua equipe. Inscreva-se →
              </span>
            </a>
          </li>

          {PAST_EDITIONS.map((ed) => (
            <li key={ed.year} className="w-[80%] shrink-0 snap-start sm:w-[340px]">
              <figure className="relative flex h-[420px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#22355A] p-7">
                {ed.image && (
                  <>
                    <Image
                      src={ed.image}
                      alt={`Equipes na ${ed.roman} Copa Motiva, em ${ed.year}`}
                      fill
                      sizes="340px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                  </>
                )}
                <span className="relative font-anton text-[5.5rem] leading-none text-transparent sm:text-[7rem] [-webkit-text-stroke:2px_#fff]">
                  {ed.year}
                </span>
                <figcaption className="relative flex flex-col gap-1">
                  <span className="font-anton text-2xl uppercase">{ed.roman} Copa Motiva</span>
                  <span className="text-sm text-white/75">{ed.image ? 'Edição ' + ed.year : 'Galeria em breve'}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
