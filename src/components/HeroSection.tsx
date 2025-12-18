import Link from 'next/link'
import { Calendar, Trophy, Users } from 'lucide-react' 
import { INSCRICAO_CTA_CLASSES } from '@/lib/constants'

export function HeroSection() {

  const whatsappNumber = "558396595988"; 
  const message = encodeURIComponent("Olá! Gostaria de realizar a inscrição na Copa Motiva de Handebol 2025.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden text-white">
      
      {/* ---- Imagem de Fundo e Overlays ---- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/gallery/destaques-edicao2.jpg')" }} 
        />
        <div className="absolute inset-0 bg-brand-dark-blue/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        
        <div className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="w-full max-w-5xl text-center">
            
            {/* Badge "Edição 2025" */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border 
                            border-brand-orange/30 bg-brand-orange/20 px-4 py-2 backdrop-blur-sm">
              <Trophy className="h-4 w-4 text-brand-orange" />
              <span className="text-brand-orange">Edição 2025</span>
            </div>
            {/* Título Principal  */}
            <div className="text-white">
              <h1 className="font-bebas text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none">
                 Copa Motiva de Handebol
              </h1>
            </div>

            {/* Subtítulo */}
            <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-300 md:text-xl lg:text-2xl">
              O maior torneio de handebol da Paraíba
            </p>

           {/* Botão CTA */}
            <div>
              <Link
                href={whatsappUrl}
                target="_blank"            
                rel="noopener noreferrer"    
                className={`${INSCRICAO_CTA_CLASSES} px-12 py-5 text-lg font-semibold`}
              >
                INSCREVA-SE
              </Link>
            </div>
            {/*  Cards de Estatísticas */}
            <div className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
              <StatCard
                icon={<Calendar className="h-6 w-6" />}
                title="4 Dias"
                description="de competição"
              />
              <StatCard
                icon={<Users className="h-6 w-6" />}
                title="12+ Equipes"
                description="participantes"
              />
              <StatCard
                icon={<Trophy className="h-6 w-6" />}
                title="Premiação"
                description="para os campeões"
              />
            </div>
          </div>
        </div>

        {/* Barra Inferior Laranja*/}
        <div className="bg-brand-orange py-5 px-4">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
            
            {/* Bloco da Data */}
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">
                20 A 23 DE NOVEMBRO
              </span>
            </div>
            
            {/* Bloco de Links */}
            <div className="flex items-center gap-6">
              <Link href="/#edicoes-anteriores" className="font-semibold text-white transition-opacity hover:opacity-80">
                EDIÇÕES ANTERIORES
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*  Indicador de Scroll */}
      <div className="absolute bottom-28 left-1/2 z-20 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-2">
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
        </div>
      </div>
    </section>
  )
}


function StatCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center
                   backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10">
      <div className="mb-3 flex justify-center text-brand-orange">
        {icon}
      </div>
      <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}