import Link from 'next/link'
import { Calendar, Trophy, Users } from 'lucide-react' 

export function HeroSection() {
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
            {/* Título Principal */}
             <div style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="text-white">
                <div className="text-5xl md:text-6xl lg:text-7xl tracking-wider mb-2 opacity-90">
                  III
                </div>
                <div className="text-6xl md:text-8xl lg:text-9xl tracking-wider leading-none mb-3">
                  COPA MOTIVA
                </div>
                <div style={{ fontFamily: "'Oswald', sans-serif" }} className="text-3xl md:text-4xl lg:text-5xl tracking-wide opacity-95 mb-3">
                  de handebol
                </div>
              </div>

            {/* Subtítulo */}
            <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-300 md:text-xl lg:text-2xl">
              O maior torneio de handebol da Paraíba
            </p>

            {/* Botão CTA */}
            <div>
              <Link
                href="/inscricao"
                className="inline-block rounded-full bg-brand-orange px-12 py-5 text-lg 
                           font-semibold text-white shadow-2xl shadow-brand-orange/30
                           transition-all hover:scale-105 hover:bg-brand-orange/90"
              >
                INSCREVA-SE
              </Link>
            </div>

            {/* 3. Cards de Estatísticas */}
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

        {/* 4. Barra Inferior Laranja*/}
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
              <Link href="/edicoes-anteriores" className="font-semibold text-white transition-opacity hover:opacity-80">
                EDIÇÕES ANTERIORES
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Indicador de Scroll */}
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