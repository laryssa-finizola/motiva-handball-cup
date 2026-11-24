import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { EVENT, SPONSORS, whatsappLink, type SponsorItem } from '@/lib/constants'

const sponsorWhatsappUrl = whatsappLink(`Olá! Tenho interesse em patrocinar a Copa Motiva de Handebol ${EVENT.nextYear}.`)

export function SponsorsSection() {
  return (
    <section id="patrocinadores" className="bg-[#F4F2EE] py-20 font-sans text-[#111] md:py-28">
      <div className="container mx-auto flex flex-col gap-12 px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C75A00]">Patrocinadores</span>
            <h2 className="font-anton text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9]">
              Nossos
              <br />
              <span className="text-transparent [-webkit-text-stroke:2px_#111]">parceiros</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-[#444]">
            Juntos fazemos esta grande competição acontecer. Obrigado a todos os nossos parceiros!
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPONSORS.map((sponsor) => (
            <li key={sponsor.name}>
              <SponsorCard sponsor={sponsor} />
            </li>
          ))}
        </ul>

        {/* Chamada para novos patrocinadores */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-brand-dark-blue p-8 text-white md:flex-row md:items-center md:p-10">
          <div className="flex flex-col gap-2">
            <p className="font-anton text-[clamp(2rem,4vw,3rem)] uppercase leading-none">
              Sua marca na <span className="text-brand-orange">Copa Motiva 2027</span>
            </p>
            <p className="max-w-lg text-base text-white/75">
              Apareça para atletas, famílias e torcida de toda a Paraíba e ajude a fazer o handebol crescer.
            </p>
          </div>
          <a
            href={sponsorWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[64px] shrink-0 items-center gap-3 rounded-full bg-brand-orange px-9 text-lg font-extrabold uppercase tracking-wide text-brand-dark-blue shadow-2xl shadow-brand-orange/40 transition-transform hover:scale-105"
          >
            Seja patrocinador
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function SponsorCard({ sponsor }: { sponsor: SponsorItem }) {
  return (
    <div
      className="flex h-36 items-center justify-center rounded-[20px] border border-black/5 bg-white px-8 transition-shadow hover:shadow-xl hover:shadow-black/5"
      style={sponsor.bg ? { backgroundColor: sponsor.bg } : undefined}
    >
      {sponsor.logo ? (
        <div className="relative h-24 w-full">
          <Image src={sponsor.logo} alt={sponsor.name} fill sizes="320px" className="object-contain" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-2xl font-extrabold leading-tight tracking-tight">{sponsor.name}</span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B665E]">{sponsor.tagline}</span>
        </div>
      )}
    </div>
  )
}
