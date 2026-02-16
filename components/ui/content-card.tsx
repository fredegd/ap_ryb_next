'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentCardProps {
  slug: string
  href: string
  image: string
  title: string
  categoryLabel: string
  metaLabel?: string
  description: string
  ctaText: string
  edgeClass: string
}

export function ContentCard({
  slug,
  href,
  image,
  title,
  categoryLabel,
  metaLabel,
  description,
  ctaText,
  edgeClass,
}: ContentCardProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          'group relative z-0 transition-transform duration-300 ease-out hover:-translate-y-4 hover:scale-[1.1] hover:z-50 will-change-transform',
          edgeClass,
        )}
      >
        <div className="relative overflow-hidden rounded-2xl bg-background/5 ring-1 ring-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-shadow duration-300 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.55)] group-hover:rounded-b-none">
          <div className="relative h-[170px] sm:h-[190px] lg:h-[210px]">
            <Image
              src={image}
              alt={title}
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
              <div className="text-[11px] font-onest font-semibold uppercase tracking-[0.24em] text-white/70">
                {categoryLabel}
              </div>
              <h3 className="mt-2 text-white text-lg sm:text-xl font-cormorant-garamond font-medium leading-tight drop-shadow-md line-clamp-2">
                {title}
              </h3>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-full mt-0 rounded-b-2xl bg-[#121820]/90 backdrop-blur-md px-4 py-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <p className="text-white/80 font-onest text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-passion-one font-semibold uppercase tracking-[0.24em] text-white/80">
            <span className="h-px w-6 bg-white/60" />
            {ctaText}
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
