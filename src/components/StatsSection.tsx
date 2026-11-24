import { CATEGORIES, EVENT, SPONSORS } from '@/lib/constants'

// Faixa preta com números grandes (todos vêm de constants.ts)
export function StatsSection() {
  const stats = [
    { value: String(EVENT.editionsHeld), label: 'Edições realizadas', accent: true },
    { value: String(EVENT.daysOfGames), label: 'Dias de jogos' },
    { value: String(CATEGORIES.length), label: 'Categorias' },
    { value: String(SPONSORS.length), label: 'Parceiros' },
  ]

  return (
    <section className="bg-[#0A0A0A] font-sans text-white" aria-labelledby="numeros-titulo">
      <div className="container mx-auto flex flex-col gap-10 px-4 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="numeros-titulo" className="font-anton text-[clamp(2rem,4vw,3rem)] uppercase leading-none">
            A copa em <span className="text-brand-orange">números</span>
          </h2>
          <p className="text-sm uppercase tracking-[0.12em] text-white/60">
            {EVENT.venue} · {EVENT.city}
          </p>
        </div>

        <dl className="grid grid-cols-2 border-t border-white/20 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse gap-3 pt-7 ${i % 2 === 1 ? 'border-l border-white/20 pl-6' : ''} ${
                i === 2 ? 'md:border-l md:border-white/20 md:pl-6' : ''
              } ${i >= 2 ? 'mt-6 border-t border-white/20 md:mt-0 md:border-t-0' : ''}`}
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{s.label}</dt>
              <dd className={`font-anton text-[clamp(5rem,10vw,9rem)] leading-[0.85] ${s.accent ? 'text-brand-orange' : ''}`}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
