import type { Metadata } from 'next'
import { HeroSection } from '@/components/HeroSection'
import { MarqueeSection } from '@/components/MarqueeSection'
import { AboutSection } from '@/components/AboutSection'
import { StatsSection } from '@/components/StatsSection'
import { CategoriesSection } from '@/components/CategoriesSection'
import { AgendaSection } from '@/components/AgendaSection'
import { GallerySection } from '@/components/GallerySection'
import { RegistrationSection } from '@/components/RegistrationSection'
import { SponsorsSection } from '@/components/SponsorsSection'
import { FaqSection } from '@/components/FaqSection'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <StatsSection />
      <SponsorsSection />
      <CategoriesSection />
      <AgendaSection />
      <GallerySection />
      <RegistrationSection />
      <FaqSection />
    </>
  )
}
