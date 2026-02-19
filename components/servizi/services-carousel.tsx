'use client'

import type { Service } from '@/lib/services'
import { ContentCarousel } from '@/components/ui/content-carousel'
import { ContentCard } from '@/components/ui/content-card'

interface ServicesCarouselProps {
  sectionName: string
  services: Service[]
}

export function ServicesCarousel({ sectionName, services }: ServicesCarouselProps) {
  return (
    <ContentCarousel
      items={services}
      renderCard={(service, index, edgeClass, interaction) => {
        const categoryLabel = service.categories?.[0]?.name || sectionName
        const metaLabel = service.duration || (service.price ? `€ ${service.price}` : undefined)

        return (
          <ContentCard
            slug={service.slug}
            href={`/servizi/${service.slug}`}
            image={service.image}
            title={service.title}
            categoryLabel={categoryLabel}
            metaLabel={metaLabel}
            description={service.description}
            ctaText="Scopri il servizio"
            edgeClass={edgeClass}
            isActive={interaction.isActive}
            isElevated={interaction.isElevated}
            onHoverStart={interaction.onHoverStart}
            onHoverEnd={interaction.onHoverEnd}
          />
        )
      }}
    />
  )
}
