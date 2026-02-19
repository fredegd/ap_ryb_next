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
  isActive: boolean
  isElevated: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
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
  isActive,
  isElevated,
  onHoverStart,
  onHoverEnd,
}: ContentCardProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          'group relative transition-transform duration-500 ease-out will-change-transform data-[active=true]:-translate-y-4 data-[active=true]:scale-[1.3] data-[elevated=true]:z-50 data-[elevated=false]:z-0',
          edgeClass,
        )}
        data-active={isActive ? 'true' : 'false'}
        data-elevated={isElevated ? 'true' : 'false'}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        <div className="relative overflow-hidden rounded-lg bg-background/5 ring-1 ring-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-shadow duration-500 group-data-[active=true]:shadow-[0_30px_80px_rgba(0,0,0,0.55)] group-data-[active=true]:rounded-b-none">
          <div className="relative h-[170px] sm:h-[190px] lg:h-[210px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-data-[active=true]:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent transition-opacity duration-300 group-data-[active=true]:opacity-40"></div>
            {metaLabel && (
              <span className="absolute top-3 right-3 inline-flex items-center rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition-opacity duration-300 delay-100 group-data-[active=true]:opacity-0">
                {metaLabel}
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-300 delay-100 group-data-[active=true]:opacity-0 group-data-[active=true]:translate-y-2">
              <div className="text-[11px] font-onest font-semibold uppercase tracking-[0.24em] text-white/70">
                {categoryLabel}
              </div>
              <h3 className="mt-2 text-white text-lg sm:text-xl font-cormorant-garamond font-medium leading-tight drop-shadow-md line-clamp-2">
                {title}
              </h3>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-full mt-0 rounded-b-lg bg-[#121820]/95 backdrop-blur-md px-4 py-5 invisible opacity-0 transition-all duration-500 delay-100 group-data-[active=true]:opacity-100 group-data-[active=true]:visible group-data-[active=true]:invisible-0  shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
          <div className="mb-3">
            <div className="text-[11px] font-onest font-semibold uppercase tracking-[0.24em] text-white/70 mb-2">
              {categoryLabel}
            </div>
            <h3 className="text-white text-lg sm:text-xl font-cormorant-garamond font-medium leading-tight line-clamp-2">
              {title}
            </h3>
          </div>
          <p className="text-white/80 font-onest text-sm leading-relaxed line-clamp-2 mb-3">
            {description}
          </p>
          <div className="inline-flex items-center gap-2 text-[11px] font-passion-one font-semibold uppercase tracking-[0.24em] text-white/90">
            <span className="h-px w-6 bg-white/60" />
            {ctaText}
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
