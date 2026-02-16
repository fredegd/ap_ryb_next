'use client'

import Link from "next/link"
import type { Service } from "@/lib/services"
import { ContentCarousel } from "@/components/ui/content-carousel"
import { ContentCard } from "@/components/ui/content-card"

interface ServicesProps {
  services: Service[]
}

export function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="bg-secondary/50 py-20">
      <div className="max-w-8xl mx-auto xl:mx-34 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-passion-one font-normal text-center mb-16 text-primary uppercase tracking-wide">Percorsi Benessere</h1>

        <ContentCarousel
          items={services}
          renderCard={(service, index, edgeClass) => {
            const categoryLabel = service.categories?.[0]?.name || 'Servizio'
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
              />
            )
          }}
        />

        <div className="mt-16 flex justify-center">
          <Link
            href="/servizi"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-8 py-4 text-base font-passion-one font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Scopri Tutti i Servizi →
          </Link>
        </div>
      </div>
    </section>
  )
}
