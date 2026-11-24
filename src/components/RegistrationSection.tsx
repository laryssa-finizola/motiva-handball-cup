import { ArrowRight, FileDown } from 'lucide-react'
import { EVENT, whatsappLink } from '@/lib/constants'

const STEPS = [
  { title: 'Leia o regulamento', text: 'Regras, categorias e faixas etárias.' },
  { title: 'Chame a organização', text: 'Pelo WhatsApp, com o nome da equipe e a categoria.' },
  { title: 'Garanta a vaga', text: 'A organização confirma a inscrição da sua equipe.' },
]

export function RegistrationSection() {
  const url = whatsappLink(`Olá! Gostaria de realizar a inscrição na Copa Motiva de Handebol ${EVENT.nextYear}.`)

  return (
    <section id="inscricao" className="bg-brand-orange py-20 font-sans text-brand-dark-blue md:py-28">
      <div className="container mx-auto flex flex-col gap-12 px-4">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.14em]">Inscrições {EVENT.nextYear}</span>
          <h2 className="font-anton text-[clamp(4rem,11vw,10rem)] uppercase leading-[0.86]">
            Sua equipe
            <br />
            em quadra.
          </h2>
        </div>

        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3 rounded-[20px] bg-[#111] p-7 text-white">
              <span className="font-anton text-5xl leading-none text-brand-orange">0{i + 1}</span>
              <strong className="text-lg">{step.title}</strong>
              <span className="text-sm text-white/70">{step.text}</span>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[60px] items-center gap-3 rounded-full bg-[#111] px-8 text-base font-extrabold uppercase tracking-wide text-white transition-transform hover:scale-105"
          >
            Inscreva sua equipe
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="/docs/regulamento.pdf"
            download
            className="inline-flex min-h-[60px] items-center gap-3 rounded-full border-2 border-[#111] px-8 text-base font-extrabold uppercase tracking-wide text-[#111] transition-colors hover:bg-[#111] hover:text-white"
          >
            <FileDown className="h-5 w-5" aria-hidden="true" />
            Baixar regulamento (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}
