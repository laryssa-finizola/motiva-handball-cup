import { CalendarClock, Instagram, MapPin } from 'lucide-react'
import { AGENDA, EVENT, SOCIAL_LINKS } from '@/lib/constants'

export function AgendaSection() {
  const hasDates = AGENDA.length > 0

  return (
    <section id="agenda" className="bg-[#E9E6E0] py-20 font-sans text-[#111] md:py-28">
      <div className="container mx-auto flex flex-col gap-10 px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C75A00]">
              Agenda {EVENT.nextYear}
            </span>
            <h2 className="font-anton text-[clamp(3.5rem,8vw,7.5rem)] uppercase leading-[0.88]">
              {EVENT.daysOfGames} dias de jogo
            </h2>
          </div>
          <p className="flex items-center gap-2 text-base font-semibold">
            <MapPin className="h-5 w-5 text-[#C75A00]" aria-hidden="true" />
            {EVENT.venue} · {EVENT.city}
          </p>
        </div>

        {hasDates ? (
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AGENDA.map((d, i) => {
              const last = i === AGENDA.length - 1
              return (
                <li
                  key={`${d.day}-${d.month}`}
                  className={`flex flex-col gap-5 rounded-[20px] p-6 ${last ? 'bg-brand-orange text-brand-dark-blue' : 'bg-white'}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-anton text-8xl leading-none">{d.day}</span>
                    <span className="text-right text-sm font-bold uppercase leading-tight">
                      {d.month}
                      <br />
                      <span className={last ? '' : 'text-[#C75A00]'}>Dia {i + 1}</span>
                    </span>
                  </div>
                  <p className="text-sm font-medium">{d.label}</p>
                </li>
              )
            })}
          </ol>
        ) : (
          // enquanto as datas não saem
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col justify-between gap-10 rounded-[24px] bg-brand-dark-blue p-8 text-white md:p-10">
              <CalendarClock className="h-10 w-10 text-brand-orange" aria-hidden="true" />
              <div className="flex flex-col gap-3">
                <p className="font-anton text-[clamp(2.5rem,5vw,4rem)] uppercase leading-none">
                  Datas da {EVENT.nextEditionLabel} <span className="text-brand-orange">em breve</span>
                </p>
                <p className="max-w-lg text-base text-white/75">
                  A programação de {EVENT.nextYear} será divulgada em breve. Siga a Copa no Instagram para saber
                  primeiro.
                </p>
              </div>
            </div>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between gap-10 rounded-[24px] bg-brand-orange p-8 text-brand-dark-blue transition-transform hover:-translate-y-1 md:p-10"
            >
              <Instagram className="h-10 w-10" aria-hidden="true" />
              <span className="flex flex-col gap-2">
                <span className="font-anton text-4xl uppercase leading-none">Acompanhe no Instagram</span>
                <span className="text-sm font-bold">@copamotivadehandebol →</span>
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
