// src/components/AboutSection.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Target, Users, Award, Calendar } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-slate-50 py-20 md:py-32">
      {/* Cores da copa */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Cabeçalho da Seção */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-brand-orange/10 px-4 py-2 text-brand-orange">
            Sobre o Torneio
          </span>
          <h2 className="font-bebas text-4xl text-slate-900 md:text-5xl lg:text-6xl mb-4">
            Conheça a Copa Motiva
          </h2>
        </div>

        {/* Grid de Conteúdo Principal */}
        <div className="mb-20 grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          {/* Lado da Imagem */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/about-image.jpg"
                alt="Ação de handebol"
                width={800}
                height={500}
                className="h-[500px] w-full object-cover"
              />
              {/* Badge na Imagem */}
              <div className="absolute bottom-6 left-6 rounded-xl bg-brand-orange px-6 py-3 text-white">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>3ª Edição • 2025</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-2xl bg-brand-blue/20" />
            <div className="absolute -top-6 -left-6 -z-10 h-32 w-32 rounded-2xl bg-brand-orange/20" />
          </div>

          <div className="space-y-8">
            {/* O que é */}
            <div>
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-lg bg-brand-orange p-2">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">
                    O que é a Copa Motiva?
                  </h3>
                  <p className="leading-relaxed text-slate-600">
                    A Copa Motiva é o maior torneio de handebol do Nordeste,
                    reunindo equipes de toda a região em uma competição que
                    celebra o esporte, a dedicação e o espírito de equipe. Com
                    duas edições de sucesso, o evento se consolidou como
                    referência no calendário esportivo regional.
                  </p>
                </div>
              </div>
            </div>

            {/* Missão */}
            <div>
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-lg bg-brand-blue p-2">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">
                    Nossa Missão
                  </h3>
                  <p className="leading-relaxed text-slate-600">
                    Promover o desenvolvimento do handebol no estado da Paraíba
                    através de competições de alto nível,
                    trabalho em equipe e superação. Queremos revelar novos
                    talentos e fortalecer a comunidade esportiva paraibana.
                  </p>
                </div>
              </div>
            </div>

            {/* Quem pode participar */}
            <div>
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-lg bg-brand-orange p-2">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">
                    Quem pode participar?
                  </h3>
                  <p className="leading-relaxed text-slate-600">
                    Equipes de todas as categorias são bem-vindas! Desde atletas
                    mirins até adultos, o torneio oferece espaço para diferentes
                    faixas etárias e níveis de experiência. Basta ter paixão pelo
                    handebol e espírito competitivo.
                  </p>
                </div>
              </div>
            </div>

            {/* Botão CTA */}
            <div className="pt-4">
              <a
                href="/docs/regulamento.pdf" 
                download="Regulamento-Copa-Motiva.pdf"
                target="_blank"
                rel="noopener noreferrer"
                 className="inline-block rounded-full bg-brand-orange px-8 py-4 
                            font-semibold text-white transition-all
                          hover:scale-105 hover:bg-brand-orange/90 
                          hover:shadow-lg hover:shadow-brand-orange/30"
              >
                Ver Regulamento Completo
              </a>
            </div>
          </div>
        </div>

        {/* Seção de Estatísticas */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <StatCard number="3ª" label="Edição" />
          <StatCard number="12+" label="Equipes" />
          <StatCard number="200+" label="Atletas" />
          <StatCard number="4" label="Dias de Jogos" />
        </div>
      </div>
    </section>
  )
}

// Card de Estatística
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 
                    text-center shadow-lg transition-transform hover:scale-105">
      <div className="font-bebas text-3xl text-brand-orange md:text-4xl mb-2">
        {number}
      </div>
      <div className="text-sm text-slate-600 md:text-base">{label}</div>
    </div>
  )
}