// Faixa preta com texto gigante correndo, logo abaixo da hero.

const ITEMS: { text: string; outline?: boolean }[] = [
  { text: 'Handebol' },
  { text: 'Paraíba' },
  { text: 'Premiações', outline: true },
  { text: 'Brindes' },
  { text: 'Organização', outline: true },
]

function BallIcon() {
  return (
    <svg
      className="h-7 w-7 shrink-0 text-brand-orange md:h-10 md:w-10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2c3.2 3 3.2 17 0 20M12 2c-3.2 3-3.2 17 0 20" />
    </svg>
  )
}

export function MarqueeSection() {
  // a segunda cópia fecha o ciclo da animação (-50%) sem emenda
  const half = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="overflow-hidden border-y-4 border-brand-orange bg-[#0A0A0A] py-4 text-white md:py-5">
      <p className="sr-only">{ITEMS.map((i) => i.text).join(' · ')}</p>
      <div
        aria-hidden="true"
        className="flex w-max animate-marquee [animation-duration:32s] motion-reduce:animate-none"
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {half.map((item, i) => (
              <li key={`${copy}-${i}`} className="flex items-center gap-6 pr-6 md:gap-8 md:pr-8">
                <span
                  className={`whitespace-nowrap font-anton text-4xl uppercase leading-none md:text-[3.25rem] ${
                    item.outline ? 'text-transparent [-webkit-text-stroke:1.5px_#fff]' : ''
                  }`}
                >
                  {item.text}
                </span>
                <BallIcon />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
