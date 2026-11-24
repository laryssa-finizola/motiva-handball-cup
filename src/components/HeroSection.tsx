import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HandballBall } from '@/components/hero/HandballBall'
import { EVENT, whatsappLink } from '@/lib/constants'

export function HeroSection() {
  const whatsappUrl = whatsappLink(`Olá! Gostaria de realizar a inscrição na Copa Motiva de Handebol ${EVENT.nextYear}.`)

  return (
    <section className="relative overflow-hidden bg-brand-dark-blue font-sans text-white">
      {/* Linhas de quadra (6 m e 9 m) atrás da bola */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 h-[900px] w-[900px] -translate-y-1/2 text-white/10 lg:-right-24"
        viewBox="0 0 900 900"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="450" cy="450" r="260" strokeWidth="2" />
        <circle cx="450" cy="450" r="390" strokeWidth="2" strokeDasharray="18 14" />
        <line x1="450" y1="0" x2="450" y2="900" strokeWidth="1" />
      </svg>

      <div className="container relative mx-auto grid items-center gap-4 px-4 pt-10 md:pt-14 lg:min-h-[calc(100svh-13.25rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8">
        {/* Texto */}
        <div className="relative z-10 flex flex-col items-start gap-6">
          <h1 id="hero-title" className="font-anton uppercase leading-[0.86]">
            <span className="block text-[clamp(5rem,14vw,12.5rem)]">Copa</span>
            <span className="block text-[clamp(5rem,14vw,12.5rem)]">Motiva</span>
            <span className="mt-3 block text-[clamp(2.5rem,6vw,5.5rem)] text-transparent [-webkit-text-stroke:2px_#F57C00]">
              de handebol
            </span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-white/80">
            O maior torneio de handebol da Paraíba.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-brand-orange px-7 text-sm font-bold uppercase tracking-wide text-brand-dark-blue shadow-2xl shadow-brand-orange/30 transition-transform hover:scale-105"
            >
              Inscreva sua equipe
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="/docs/regulamento.pdf"
              download
              className="inline-flex min-h-[52px] items-center rounded-full border-[1.5px] border-white/50 px-7 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Ver regulamento
            </a>
          </div>
        </div>

        {/* Bola 3D */}
        <div className="relative h-[380px] sm:h-[460px] lg:h-[620px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[45%] h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/20 blur-3xl"
          />
          <HandballBall className="absolute inset-0" fontSourceSelector="#hero-title" />
        </div>
      </div>

      {/* Faixa inferior */}
      <div className="relative border-t border-white/15 bg-black/25">
        <dl className="container mx-auto grid grid-cols-2 gap-y-5 px-4 py-6 lg:flex lg:justify-between">
          <HeroStat label="próxima edição" value="2027" accent />
          <HeroStat label="categorias" value="Pré-mirim ao juvenil" />
          <HeroStat label="para os campeões" value="Premiação" />
          <HeroStat label="cobertura dos jogos" value="Fotos profissionais" />
        </dl>
      </div>
    </section>
  )
}

function HeroStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col-reverse justify-end gap-1 border-l border-white/15 pl-5 first:border-l-0 first:pl-0 [&:nth-child(3)]:border-l-0 [&:nth-child(3)]:pl-0 lg:[&:nth-child(3)]:border-l lg:[&:nth-child(3)]:pl-6 lg:pl-6">
      <dt className="text-xs uppercase tracking-[0.1em] text-white/60 lg:whitespace-nowrap">{label}</dt>
      <dd className={`font-anton text-2xl uppercase leading-none sm:text-3xl lg:whitespace-nowrap lg:text-[2rem] xl:text-4xl ${accent ? 'text-brand-orange' : 'text-white'}`}>
        {value}
      </dd>
    </div>
  )
}
