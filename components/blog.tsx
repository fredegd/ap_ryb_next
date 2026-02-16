'use client'

import * as React from 'react'
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface BlogProps {
  posts: BlogPost[]
}

export function Blog({ posts }: BlogProps) {
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
    <section id="blog" className="bg-background py-20">
      <div className="max-w-8xl mx-auto xl:mx-34 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-passion-one font-normal text-center mb-16 text-primary uppercase tracking-wide">Dal Mio Blog</h1>

        <div className="relative overflow-visible">
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
                  {posts.map((post, index) => {
                    const categoryLabel = post.category || 'Blog'
                    const edgeClass =
                      index === edge.left
                        ? 'origin-left hover:translate-x-3'
                        : index === edge.right
                          ? 'origin-right hover:-translate-x-3'
                          : 'origin-center'

                    return (
                      <CarouselItem
                        key={post.slug}
                        className="pl-4 basis-[280px] sm:basis-[320px] lg:basis-[360px] xl:basis-[380px] relative"
                      >
                        <Link href={`/blog/${post.slug}`}>
                          <div
                            className={cn(
                              'group relative z-0 transition-transform duration-300 ease-out hover:-translate-y-4 hover:scale-[1.1] hover:z-50 will-change-transform',
                              edgeClass,
                            )}
                          >
                            <div className="relative overflow-hidden rounded-2xl bg-background/5 ring-1 ring-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-shadow duration-300 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.55)] group-hover:rounded-b-none">
                              <div className="relative h-[170px] sm:h-[190px] lg:h-[210px]">
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent"></div>
                                <div className="absolute inset-x-0 bottom-0 p-4">
                                  <div className="text-[11px] font-onest font-semibold uppercase tracking-[0.24em] text-white/70">
                                    {categoryLabel}
                                  </div>
                                  <h3 className="mt-2 text-white text-lg sm:text-xl font-cormorant-garamond font-semibold leading-tight drop-shadow-md line-clamp-2">
                                    {post.title}
                                  </h3>
                                </div>
                              </div>
                            </div>

                            <div className="absolute left-0 right-0 top-full mt-0 rounded-b-2xl bg-[#121820]/90 backdrop-blur-md px-4 py-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                              <p className="text-white/80 font-onest text-sm leading-relaxed line-clamp-2">
                                {post.excerpt}
                              </p>
                              <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-passion-one font-semibold uppercase tracking-[0.24em] text-white/80">
                                <span className="h-px w-6 bg-white/60" />
                                Leggi l'articolo
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
                className={cn(
                  '!static !translate-y-0 !left-auto !right-auto !top-auto hidden md:flex h-[170px] sm:h-[190px] lg:h-[210px] w-12 shrink-0 rounded-r-2xl rounded-l-none bg-black/55 text-white ring-1 ring-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-accent hover:text-accent-foreground z-30 transition-opacity duration-200 disabled:opacity-0',
                  !canScrollNext && 'opacity-0 pointer-events-none',
                )}
              />
            </div>
          </Carousel>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-8 py-4 text-base font-passion-one font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Leggi gli Articoli →
          </Link>
        </div>
      </div>
    </section>
  )
}
