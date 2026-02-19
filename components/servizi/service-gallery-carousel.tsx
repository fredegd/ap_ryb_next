'use client'

import * as React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface ServiceGalleryCarouselProps {
  images: string[]
  title: string
  className?: string
}

const arrowClasses =
  '!static !translate-y-0 !left-auto !right-auto !top-auto hidden md:flex h-[170px] sm:h-[190px] lg:h-[210px] w-12 shrink-0 rounded-l-lg rounded-r-none bg-black/55 text-white ring-1 ring-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-accent hover:text-accent-foreground z-30 transition-opacity duration-200'

const arrowClassesRight =
  '!static !translate-y-0 !left-auto !right-auto !top-auto hidden md:flex h-[170px] sm:h-[190px] lg:h-[210px] w-12 shrink-0 rounded-r-lg rounded-l-none bg-black/55 text-white ring-1 ring-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-accent hover:text-accent-foreground z-30 transition-opacity duration-200'

export function ServiceGalleryCarousel({
  images,
  title,
  className,
}: ServiceGalleryCarouselProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)
  const isOpen = selectedIndex !== null

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedIndex(null)
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
        }}
        className="w-full relative group/carousel"
      >
        <div className="flex items-center gap-2">
          <CarouselPrevious
            variant="ghost"
            size="icon-lg"
            className={arrowClasses}
          />

          <div className="relative flex-1 min-w-0" style={{ overflowX: 'clip' }}>
            <CarouselContent containerClassName="overflow-visible" className="-ml-4">
              {images.map((imgUrl, index) => (
                <CarouselItem
                  key={`${imgUrl}-${index}`}
                  className="pl-4 basis-[280px] sm:basis-[320px] lg:basis-[360px] xl:basis-[380px]"
                >
                  <button
                    type="button"
                    className="group relative w-full overflow-hidden rounded-lg bg-background/5 ring-1 ring-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Apri immagine ${index + 1} di ${images.length}`}
                  >
                    <div className="relative h-[170px] sm:h-[190px] lg:h-[210px]">
                      <Image
                        src={imgUrl}
                        alt={`${title} gallery image ${index + 1}`}
                        fill
                        sizes="(min-width: 1280px) 380px, (min-width: 1024px) 360px, (min-width: 640px) 320px, 280px"
                        className="object-cover"
                      />
                    </div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

          <CarouselNext
            variant="ghost"
            size="icon-lg"
            className={arrowClassesRight}
          />
        </div>
      </Carousel>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="top-0 left-0 translate-x-0 translate-y-0 h-[100dvh] w-screen max-w-none rounded-none border-0 bg-black/95 p-0 sm:max-w-none"
        >
          <DialogClose className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            <X className="h-5 w-5" />
            <span className="sr-only">Chiudi</span>
          </DialogClose>
          {selectedIndex !== null && (
            <div className="relative h-full w-full">
              <Image
                src={images[selectedIndex]}
                alt={`${title} gallery image ${selectedIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
