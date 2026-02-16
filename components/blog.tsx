'use client'

import Link from "next/link"
import type { BlogPost } from "@/lib/blog"
import { ContentCarousel } from "@/components/ui/content-carousel"
import { ContentCard } from "@/components/ui/content-card"

interface BlogProps {
  posts: BlogPost[]
}

export function Blog({ posts }: BlogProps) {
  return (
    <section id="blog" className="bg-background py-20">
      <div className="max-w-8xl mx-auto xl:mx-34 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-passion-one font-normal text-center mb-16 text-primary uppercase tracking-wide">Dal Mio Blog</h1>

        <ContentCarousel
          items={posts}
          renderCard={(post, index, edgeClass) => {
            const categoryLabel = post.category || 'Blog'

            return (
              <ContentCard
                slug={post.slug}
                href={`/blog/${post.slug}`}
                image={post.image}
                title={post.title}
                categoryLabel={categoryLabel}
                description={post.excerpt}
                ctaText="Leggi l'articolo"
                edgeClass={edgeClass}
              />
            )
          }}
        />

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
