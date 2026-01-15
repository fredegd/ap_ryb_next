import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface BlogProps {
  posts: BlogPost[]
}

export function Blog({ posts }: BlogProps) {

  return (
    <section id="blog" className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">DAL MIO BLOG</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div
                className="group relative overflow-hidden rounded-lg h-96 cursor-pointer border-2 transition-colors duration-300"
                style={{ borderColor: post.categoryColor || 'transparent' }}
              >
                {/* Blog image */}
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Color Overlay */}
                <div
                  className="absolute inset-0 opacity-30 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(to bottom, transparent, ${post.categoryColor || 'transparent'})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 group-hover:to-black/80 transition-all duration-300"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <p className="text-white/70 text-sm mb-2 uppercase transition-opacity duration-300 group-hover:opacity-0">{post.category}</p>
                    <h3 className="text-white font-bold text-xl">{post.title}</h3>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-primary font-bold flex items-center gap-2 text-sm bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/50">
                      LEGGI L'ARTICOLO <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Leggi gli Articoli →
          </Link>
        </div>
      </div>
    </section>
  )
}
