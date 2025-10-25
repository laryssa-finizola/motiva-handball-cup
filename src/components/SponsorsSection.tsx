import Image from 'next/image'
import Link from 'next/link'

interface Sponsor {
  name: string
  logo: string 
  url: string
}

// 2. Lista de patrocinadores (fictícia ate o momento)
const allSponsors: Sponsor[] = [
  {
    name: "Nike",
    logo: "/images/sponsors/nike.png",
    url: "#",
  },
  {
    name: "Adidas",
    logo: "/images/sponsors/adidas.png",
    url: "#",
  },
  { name: "Kempa", logo: "/images/sponsors/kempa.png", url: "#" },
  {
    name: "Asics",
    logo: "/images/sponsors/asics.png",
    url: "#",
  },
  { name: "Puma", logo: "/images/sponsors/puma.png", url: "#" },
  { name: "Kappa", logo: "/images/sponsors/kappa.png", url: "#" },
]

export function SponsorsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-24">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Cabeçalho da Seção */}
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/10 px-4 py-2">
            <span className="text-brand-orange">Nossos Parceiros</span>
          </div>

          <h2 className="font-bebas text-4xl text-slate-900 md:text-5xl lg:text-6xl mb-4">
            Patrocinadores
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Empresas que acreditam e apoiam o desenvolvimento do handebol na
            Paraíba
          </p>
        </div>

        {/* Grid de Patrocinadores */}
        <div className="mb-12 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 md:gap-6">
          {allSponsors.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>

        {/* CTA para ser Patrocinador */}
        <div className="border-t border-slate-200 pt-8 text-center">
          <p className="mb-4 text-slate-600">
            Quer fazer parte dessa história?
          </p>
          <Link
            href="/contato" 
            className="inline-block rounded-full bg-brand-orange px-8 py-3 
                       font-semibold text-white transition-all
                       hover:scale-105 hover:bg-brand-orange/90 
                       hover:shadow-lg hover:shadow-brand-orange/30"
          >
            Seja um Patrocinador
          </Link>
        </div>
      </div>
    </section>
  )
}

// 4. Componente do Card de Patrocinador 
function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Link
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex aspect-square cursor-pointer flex-col items-center 
                 justify-center rounded-xl border border-slate-100 bg-white 
                 p-6 shadow-md transition-all hover:-translate-y-1 
                 hover:scale-105 hover:shadow-xl"
    >
      {/* Contêiner da Imagem */}
      <div className="relative mb-2 h-16 w-16">
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          fill 
          className="object-contain transition-transform group-hover:scale-110" 
        />
      </div>
      <span className="text-center text-xs text-slate-700">{sponsor.name}</span>
    </Link>
  )
}