'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export interface ContentCarouselItem {
  slug: string
  [key: string]: any
}

interface ContentCarouselProps<T extends ContentCarouselItem> {
  items: T[]
  renderCard: (item: T, index: number, edgeClass: string) => React.ReactNode
  className?: string
  itemClassName?: string
}

export function ContentCarousel<T extends ContentCarouselItem>({
  items,
  renderCard,
  className,
  itemClassName,
}: ContentCarouselProps<T>) {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [edge, setEdge] = React.useState<{ left: number | null; right: number | null }>({
    left: null,
    right: null,
  })
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const updateEdges = React.useCallback((embla: CarouselApi) => {
    if (!embla) return
    const inView = embla.slidesInView()
    if (!inView.length) {
      setEdge({ left: null, right: null })
      return
    }
    setEdge({ left: inView[0], right: inView[inView.length - 1] })
    setCanScrollPrev(embla.canScrollPrev())
    setCanScrollNext(embla.canScrollNext())
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
    <div className={cn('relative overflow-visible', className)}>
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
        <div className="flex items-center gap-2">
          <CarouselPrevious
            variant="ghost"
            size="icon-lg"
            className={cn(
              '!static !translate-y-0 !left-auto !right-auto !top-auto hidden md:flex h-[170px] sm:h-[190px] lg:h-[210px] w-12 shrink-0 rounded-l-2xl rounded-r-none bg-black/55 text-white ring-1 ring-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-accent hover:text-accent-foreground z-30 transition-opacity duration-200 disabled:opacity-0',
              !canScrollPrev && 'opacity-0 pointer-events-none',
            )}
          />

          <div className="relative flex-1 min-w-0" style={{ overflowX: 'clip' }}>
            <CarouselContent
              containerClassName="overflow-visible"
              className="-ml-4"
            >
              {items.map((item, index) => {
                const edgeClass =
                  index === edge.left
                    ? 'origin-left hover:translate-x-3'
                    : index === edge.right
                      ? 'origin-right hover:-translate-x-3'
                      : 'origin-center'

                return (
                  <CarouselItem
                    key={item.slug}
                    className={cn(
                      'pl-4 basis-[280px] sm:basis-[320px] lg:basis-[360px] xl:basis-[380px] relative',
                      itemClassName
                    )}
                  >
                    {renderCard(item, index, edgeClass)}
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </div>

          <CarouselNext
            variant="ghost"
            size="icon-lg"
            className={cn(
              '!static !translate-y-0 !left-auto !right-auto !top-auto hidden md:flex h-[170px] sm:h-[190px] lg:h-[210px] w-12 shrink-0 rounded-r-2xl rounded-l-none bg-black/55 text-white ring-1 ring-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-accent hover:text-accent-foreground z-30 transition-opacity duration-200 disabled:opacity-0',
              !canScrollNext && 'opacity-0 pointer-events-none',
            )}
          />
        </div>
      </Carousel>
    </div>
  )
}
