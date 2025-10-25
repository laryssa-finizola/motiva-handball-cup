// src/components/GallerySection.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Camera, Calendar, ChevronRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


interface GalleryCardProps {
  id: number
  title: string
  year: string
  image: string
  description: string
  isComingSoon?: boolean 
}


const galleryItems: GalleryCardProps[] = [
  {
    id: 3, 
    title: "3ª Edição",
    year: "2025",
    image: "/images/gallery/em-breve.png", 
    description: "Prepare-se para os novos recordes!",
    isComingSoon: true, 
  },
  {
    id: 1,
    title: "2ª Edição",
    year: "2024",
    image: "/images/gallery/destaques-edicao2.jpg",
    description: "Momentos inesquecíveis da segunda edição",
  },
  {
    id: 2,
    title: "1ª Edição",
    year: "2023",
    image: "/images/gallery/destaques-edicao1.jpg",
    description: "O início de uma grande história",
  }
]

//  Componente Principal da Seção
export function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-brand-dark-blue py-20 md:py-32">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-brand-orange/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-blue/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/10 px-4 py-2">
            <Camera className="h-4 w-4 text-brand-orange" />
            <span className="text-brand-orange">Galeria de Destaques</span>
          </div>

          <h2 className="font-bebas text-4xl text-white md:text-5xl lg:text-6xl mb-4">
            Reviva os Melhores Momentos
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Confira os destaques e a emoção das edições anteriores da Copa Motiva
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {galleryItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <GalleryCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex -left-12 border-white/20 bg-white/10 text-white hover:bg-white/20" />
            <CarouselNext className="hidden md:flex -right-12 border-white/20 bg-white/10 text-white hover:bg-white/20" />
          </Carousel>

          <div className="mt-6 text-center md:hidden">
            <p className="flex items-center justify-center gap-2 text-sm text-slate-500">
              Deslize para ver mais
              <ChevronRight className="h-4 w-4 animate-pulse" />
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/galeria"
            className="group inline-flex items-center gap-2 rounded-full border-2 
                       border-brand-orange px-8 py-4 text-brand-orange
                       transition-all hover:scale-105 hover:bg-brand-orange hover:text-white"
          >
            Ver Galeria Completa
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// 4. Componente do Card da Galeria
function GalleryCard({ item }: { item: GalleryCardProps }) {
  return (
    <Link 
      href={item.isComingSoon ? "#" : `/galeria/${item.id}`} // Se estado = "em breve", o link não leva a lugar nenhum
      className="group relative block"
      {...(item.isComingSoon && { style: { pointerEvents: 'none' } })}
    >
      <div className="relative h-[400px] cursor-pointer overflow-hidden rounded-2xl bg-brand-dark-blue/50">
        {/* Imagem */}
        <Image
          src={item.image}
          alt={item.title}
          width={800}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className={`absolute inset-0 ${item.isComingSoon ? 'bg-brand-dark-blue/80' : 'bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/40 to-transparent'} opacity-80 transition-opacity group-hover:opacity-90`} />

        {/* Conteúdo */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* Badge de Ano */}
          <div className="mb-3 w-fit">
            <span className={`rounded-full px-3 py-1 text-sm text-white ${item.isComingSoon ? 'bg-slate-500' : 'bg-brand-orange'}`}>
              {item.year}
            </span>
          </div>

          {/* Título */}
          <h3 className="font-bebas text-3xl text-white transition-colors group-hover:text-brand-orange mb-2">
            {item.title}
          </h3>

          {/* Descrição */}
          <p className={`mb-4 text-sm text-slate-300 ${item.isComingSoon ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'}`}>
            {item.description}
          </p>

          {/* Botão "Ver fotos" ou "Em breve" */}
          {item.isComingSoon ? (
            <div className="flex items-center gap-2 text-slate-400 opacity-100">
              <span className="text-sm font-semibold">Em breve!</span>
              <Calendar className="h-4 w-4" /> {/* Ícone de calendário para "em breve" */}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-brand-orange opacity-0 transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-sm font-semibold">Ver fotos</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Borda  */}
        <div className={`pointer-events-none absolute inset-0 rounded-2xl border-2 border-brand-orange transition-opacity ${item.isComingSoon ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />
      </div>
    </Link>
  )
}