import { SPONSORS } from '@/lib/constants';
import Image from 'next/image';

export function SponsorsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Nossos Patrocinadores
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {SPONSORS.map((sponsor) => (
            <div 
              key={sponsor.name}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all"
            >
              <Image
                src={sponsor.logo}
                alt={`Logo ${sponsor.name}`}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}