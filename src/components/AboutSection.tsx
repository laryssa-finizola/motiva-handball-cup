import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="sobre" className="bg-[#F4F2EE] py-20 font-sans text-[#111] md:py-28">
      <div className="container mx-auto flex flex-col gap-12 px-4 md:gap-14">
        <div className="flex flex-col gap-5">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C75A00]">Sobre o torneio</span>

        {/* Frase de abertura com palavras destacadas */}
        <h2 className="max-w-5xl text-[clamp(1.85rem,3.6vw,3.25rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
          O maior torneio de handebol da Paraíba reúne equipes de todo o estado para celebrar{' '}
          <span className="whitespace-nowrap rounded-xl bg-brand-orange px-2.5 text-brand-dark-blue">
            o esporte
          </span>
          , a dedicação e o{' '}
          <span className="whitespace-nowrap rounded-xl bg-[#111] px-2.5 text-white">
            espírito de equipe
          </span>
          .
        </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Escudo da copa: quadrado até 1024px, depois ocupa a altura de duas linhas */}
          {/* o fundo do card tem a mesma cor creme da arte, para ela se estender sem emenda */}
          <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#F2EAE3] lg:row-span-2 lg:aspect-auto">
            <Image
              src="/images/escudo-copa-motiva.webp"
              alt="Escudo da Copa Motiva de Handebol"
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>

          <AboutCard number="01" title="O que é a Copa Motiva?">
            O maior torneio de handebol de base da Paraíba, realizado em Campina Grande. Edição após edição, virou
            referência no calendário esportivo regional.
          </AboutCard>

          <AboutCard number="02" title="Nossa missão">
            Desenvolver o handebol no estado com competições de alto nível, fair play, trabalho em equipe e superação
            — e revelar novos talentos.
          </AboutCard>

          <article className="flex flex-col gap-3 rounded-[20px] bg-brand-dark-blue p-7 text-white lg:col-span-2">
            <span className="font-anton text-6xl leading-none text-brand-orange">03</span>
            <h3 className="text-xl font-bold">Quem pode participar?</h3>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/80">
              Equipes do pré-mirim ao juvenil, em diferentes níveis de experiência. Basta ter paixão pelo handebol e
              espírito competitivo.
            </p>
            <a
              href="/docs/regulamento.pdf"
              download
              className="mt-2 inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-bold uppercase tracking-wide text-brand-orange transition-colors hover:text-white"
            >
              Ver regulamento completo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}

function AboutCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <article className="flex flex-col gap-3 rounded-[20px] bg-white p-7">
      <span className="font-anton text-6xl leading-none text-[#C75A00]">{number}</span>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-[15px] leading-relaxed text-[#444]">{children}</p>
    </article>
  )
}
