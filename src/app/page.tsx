// src/app/page.tsx - CORRIGIDO
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { GallerySection } from '@/components/GallerySection';
import { SponsorsSection } from '@/components/SponsorsSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <SponsorsSection />
    </main>
  );
}