import { Edition } from '@/types';
import Image from 'next/image';

const editions: Edition[] = [
  {
    year: 2024,
    title: 'Edição de 2024',
    description: 'A primeira edição da Copa Motiva foi um sucesso!',
    images: ['/images/gallery/destaques-edicao1.jpg']
  },
  {
    year: 2023,
    title: 'Edição de 2023',
    description: 'Ainda mais times e emoção!',
    images: ['/images/gallery/destaques-edicao2.jpg']
  }
];

export function GallerySection() {
  return (
    // id para âncora do header
    <section id="edicoes-anteriores" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Edições Anteriores
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {editions.map((edition) => (
            <div key={edition.year} className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={edition.images[0]}
                alt={edition.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{edition.title}</h3>
                <p className="text-muted-foreground">{edition.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}