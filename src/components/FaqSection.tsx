import { Plus } from 'lucide-react'
import { FAQ } from '@/lib/faq'

export function FaqSection() {
  return (
    <section id="duvidas" className="bg-[#F4F2EE] py-20 font-sans text-[#111] md:py-28">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C75A00]">Dúvidas</span>
          <h2 className="font-anton text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9]">
            Perguntas
            <br />
            <span className="text-transparent [-webkit-text-stroke:2px_#111]">frequentes</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ.map((item, i) => (
            <details
              key={item.question}
              open={i === 0}
              className="group rounded-[20px] bg-white px-6 py-5 transition-shadow open:shadow-xl open:shadow-black/5 md:px-8"
            >
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                <h3>{item.question}</h3>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-orange text-brand-dark-blue transition-transform group-open:rotate-45">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl pb-1 pt-2 text-[15px] leading-relaxed text-[#444]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
