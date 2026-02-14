'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import type { Service } from '@/lib/services'
import { cn } from '@/lib/utils'

interface ServicesCarouselProps {
  sectionName: string
  services: Service[]
}

export function ServicesCarousel({ sectionName, services }: ServicesCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [edge, setEdge] = React.useState<{ left: number | null; right: number | null }>({
    left: null,
    right: null,
  })

  const updateEdges = React.useCallback((embla: CarouselApi) => {
    const inView = embla.slidesInView()
    if (!inView.length) {
      setEdge({ left: null, right: null })
      return
    }
    setEdge({ left: inView[0], right: inView[inView.length - 1] })
  }, [])

  React.useEffect(() => {
    if (!api) return
    updateEdges(api)

    api.on('select', updateEdges)
    api.on('reInit', updateEdges)
    api.on('scroll', updateEdges)

    return () => {
      api.off('select', updateEdges)
      api.off('reInit', updateEdges)
      api.off('scroll', updateEdges)
    }
  }, [api, updateEdges])

  return (
    <div className="relative overflow-x-hidden">
      <Carousel
        opts={{
          align: 'start',
          loop: false,
          containScroll: 'trimSnaps',
          dragFree: true,
        }}
        setApi={setApi}
        className="w-full relative group/carousel"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <CarouselPrevious
            variant="ghost"
            size="icon-lg"
            className="!static !translate-y-0 !left-auto !right-auto !top-auto hidden md:flex h-[170px] sm:h-[190px] lg:h-[210px] w-12 shrink-0 rounded-2xl bg-black/55 text-white ring-1 ring-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-black/70 hover:text-white z-30"
          />

          <div className="relative flex-1 min-w-0">
            <CarouselContent
              containerClassName="overflow-x-hidden overflow-y-visible pb-20"
              className="-ml-4"
            >
              {services.map((service, index) => {
                const categoryLabel = service.categories?.[0]?.name || sectionName
                const metaLabel = service.duration || (service.price ? `€ ${service.price}` : undefined)
                const edgeClass =
                  index === edge.left
                    ? 'origin-left hover:translate-x-3'
                    : index === edge.right
                      ? 'origin-right hover:-translate-x-3'
                      : 'origin-center'

                return (
                  <CarouselItem
                    key={`${sectionName}-${service.slug}`}
                    className="pl-4 basis-[280px] sm:basis-[320px] lg:basis-[360px] xl:basis-[380px] relative"
                  >
                    <Link href={`/servizi/${service.slug}`}>
                      <div
                        className={cn(
                          'group relative transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.06] hover:z-30 will-change-transform',
                          edgeClass,
                        )}
                      >
                        <div className="relative overflow-hidden rounded-2xl bg-background/5 ring-1 ring-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-shadow duration-300 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                          <div className="relative h-[170px] sm:h-[190px] lg:h-[210px]">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent"></div>
                            {metaLabel && (
                              <span className="absolute top-3 right-3 inline-flex items-center rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                                {metaLabel}
                              </span>
                            )}
                            <div className="absolute inset-x-0 bottom-0 p-4">
                              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                                {categoryLabel}
                              </div>
                              <h3 className="mt-2 text-white text-lg sm:text-xl font-semibold leading-tight drop-shadow-md line-clamp-2">
                                {service.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-[#121820]/90 backdrop-blur-md px-4 py-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                          <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                            {service.description}
                          </p>
                          <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
                            <span className="h-px w-6 bg-white/60" />
                            Scopri il servizio
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </div>

          <CarouselNext
            variant="ghost"
            size="icon-lg"
            className="!static !translate-y-0 !left-auto !right-auto !top-auto hidden md:flex h-[170px] sm:h-[190px] lg:h-[210px] w-12 shrink-0 rounded-2xl bg-black/55 text-white ring-1 ring-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-black/70 hover:text-white z-30"
          />
        </div>
      </Carousel>
    </div>
  )
}
