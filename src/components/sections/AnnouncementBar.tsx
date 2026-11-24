// Faixa laranja animada que fica acima do cabeçalho.

// Preencha com a cidade ou o ginásio quando estiver definido (ex.: 'João Pessoa').
// Enquanto estiver vazio, a faixa mostra só "Paraíba".
const LOCAL = ''

const ITEMS = [
  'Inscrições abertas',
  'Edição 2027',
  'Do pré-mirim ao juvenil',
  LOCAL ? `${LOCAL} · Paraíba` : 'Paraíba',
]

export function AnnouncementBar() {
  // a lista é repetida para preencher telas largas; a segunda metade é cópia
  // da primeira, assim a animação de -50% fecha o ciclo sem emenda
  const half = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="overflow-hidden bg-brand-orange text-brand-dark-blue" role="region" aria-label="Avisos">
      {/* texto para leitores de tela, sem a repetição visual */}
      <p className="sr-only">{ITEMS.join(' · ')}</p>
      <div aria-hidden="true" className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {half.map((item, i) => (
              <li
                key={`${copy}-${i}`}
                className="flex items-center whitespace-nowrap py-2.5 font-sans text-xs font-bold uppercase tracking-[0.1em]"
              >
                <span className="px-6">{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-dark-blue" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
