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
  renderCard: (
    item: T,
    index: number,
    edgeClass: string,
    interaction: {
      isActive: boolean
      isElevated: boolean
      onHoverStart: () => void
      onHoverEnd: () => void
    },
  ) => React.ReactNode
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
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const [closingIndex, setClosingIndex] = React.useState<number | null>(null)
  const [pendingIndex, setPendingIndex] = React.useState<number | null>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const switchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const TRANSITION_MS = 500

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

  const clearSwitchTimeout = React.useCallback(() => {
    if (switchTimeoutRef.current) {
      clearTimeout(switchTimeoutRef.current)
      switchTimeoutRef.current = null
    }
  }, [])

  const clearCloseTimeout = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const startClosing = React.useCallback(
    (index: number) => {
      setClosingIndex(index)
      clearCloseTimeout()
      closeTimeoutRef.current = setTimeout(() => {
        setClosingIndex((current) => (current === index ? null : current))
      }, TRANSITION_MS)
    },
    [clearCloseTimeout],
  )

  const handleHoverStart = React.useCallback(
    (index: number) => {
      if (activeIndex === index) return

      if (closingIndex === index) {
        clearSwitchTimeout()
        clearCloseTimeout()
        setClosingIndex(null)
        setPendingIndex(null)
        setActiveIndex(index)
        return
      }

      if (activeIndex === null && closingIndex === null) {
        clearSwitchTimeout()
        setPendingIndex(null)
        setActiveIndex(index)
        return
      }

      if (activeIndex !== null) {
        startClosing(activeIndex)
        setActiveIndex(null)
      }

      setPendingIndex(index)
      clearSwitchTimeout()
      switchTimeoutRef.current = setTimeout(() => {
        setActiveIndex(index)
        setPendingIndex(null)
        setClosingIndex(null)
        switchTimeoutRef.current = null
      }, TRANSITION_MS)
    },
    [
      activeIndex,
      closingIndex,
      clearCloseTimeout,
      clearSwitchTimeout,
      startClosing,
    ],
  )

  const handleHoverEnd = React.useCallback(
    (index: number) => {
      if (pendingIndex === index) {
        setPendingIndex(null)
        clearSwitchTimeout()
      }

      if (activeIndex === index) {
        setActiveIndex(null)
        startClosing(index)
      }
    },
    [activeIndex, pendingIndex, clearSwitchTimeout, startClosing],
  )

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

  React.useEffect(() => {
    return () => {
      clearSwitchTimeout()
      clearCloseTimeout()
    }
  }, [clearSwitchTimeout, clearCloseTimeout])

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
              '!static !translate-y-0 !left-auto !right-auto !top-auto hidden md:flex h-[170px] sm:h-[190px] lg:h-[210px] w-12 shrink-0 rounded-l-lg rounded-r-none bg-black/55 text-white ring-1 ring-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-accent hover:text-accent-foreground z-30 transition-opacity duration-200 disabled:opacity-0',
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
                    ? 'origin-left data-[active=true]:translate-x-3'
                    : index === edge.right
                      ? 'origin-right data-[active=true]:-translate-x-3'
                      : 'origin-center'
                const isActive = index === activeIndex
                const isElevated = isActive || index === closingIndex

                return (
                  <CarouselItem
                    key={item.slug}
                    className={cn(
                      'pl-4 basis-[280px] sm:basis-[320px] lg:basis-[360px] xl:basis-[380px] relative',
                      itemClassName
                    )}
                  >
                    {renderCard(item, index, edgeClass, {
                      isActive,
                      isElevated,
                      onHoverStart: () => handleHoverStart(index),
                      onHoverEnd: () => handleHoverEnd(index),
                    })}
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </div>

          <CarouselNext
            variant="ghost"
            size="icon-lg"
            className={cn(
              '!static !translate-y-0 !left-auto !right-auto !top-auto hidden md:flex h-[170px] sm:h-[190px] lg:h-[210px] w-12 shrink-0 rounded-r-lg rounded-l-none bg-black/55 text-white ring-1 ring-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-accent hover:text-accent-foreground z-30 transition-opacity duration-200 disabled:opacity-0',
              !canScrollNext && 'opacity-0 pointer-events-none',
            )}
          />
        </div>
      </Carousel>
    </div>
  )
}
