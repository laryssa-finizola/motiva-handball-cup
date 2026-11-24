import Link from 'next/link'
import { Instagram, MapPin, MessageCircle } from 'lucide-react'
import { EVENT, SOCIAL_LINKS, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/constants'

const NAV = [
  { href: '/#sobre', label: 'A Copa' },
  { href: '/#patrocinadores', label: 'Patrocinadores' },
  { href: '/#categorias', label: 'Categorias' },
  { href: '/#agenda', label: 'Agenda' },
  { href: '/#edicoes-anteriores', label: 'Edições' },
  { href: '/#duvidas', label: 'Dúvidas' },
]

export function Footer() {
  return (
    <footer id="contato" className="overflow-hidden bg-[#0A0A0A] font-sans text-white">
      <div className="container mx-auto flex flex-col gap-14 px-4 pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <h2 className="font-anton text-5xl uppercase leading-[0.95]">
            Fale com a
            <br />
            <span className="text-brand-orange">organização</span>
          </h2>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Contato</span>
            <a
              href={whatsappLink('Olá! Gostaria de falar com a organização da Copa Motiva de Handebol.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-brand-orange"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-brand-orange"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              @copamotivadehandebol
            </a>
          </div>

          <nav aria-label="Rodapé" className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Navegue</span>
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-brand-orange">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Onde acontece</span>
            <address className="flex items-start gap-2 not-italic">
              <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {EVENT.venue} · {EVENT.venueDetail}
                <br />
                {EVENT.city}
              </span>
            </address>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-white/15 py-6 text-sm text-white/55">
          <span>© {new Date().getFullYear()} Copa Motiva de Handebol</span>
          <a href="/docs/regulamento.pdf" download className="hover:text-white">
            Regulamento
          </a>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="-mb-[2vw] whitespace-nowrap text-center font-anton text-[17.5vw] uppercase leading-[0.8] text-brand-orange"
      >
        Copa Motiva
      </p>
    </footer>
  )
}
