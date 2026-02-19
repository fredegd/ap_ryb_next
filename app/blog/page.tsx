import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { getAllBlogPosts } from "@/lib/blog"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Reset Your Body",
  description: "Leggi gli ultimi articoli su wellness, training e recupero fisico",
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://resetyourbody.it/blog',
    siteName: 'Reset Your Body',
    title: 'Blog - Reset Your Body',
    description: 'Leggi gli ultimi articoli su wellness, training e recupero fisico',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Blog - Reset Your Body',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Reset Your Body',
    description: 'Leggi gli ultimi articoli su wellness, training e recupero fisico',
    images: ['/opengraph-image.png'],
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-passion-one font-normal text-primary mb-6 text-center uppercase tracking-wide">Dal Mio Blog</h1>
            <p className="text-lg font-onest text-foreground/70 text-center max-w-2xl mx-auto">
              Articoli e guide su wellness, training, e recupero fisico per aiutarti a ottenere il massimo dal tuo
              corpo.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:space-y-10 space-y-24">
              {posts.map((post) => (
                <article key={post.id} className="border-b border-border pb-12 last:border-b-0">
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative w-full md:w-52 lg:w-60 aspect-[3/2] rounded-lg overflow-hidden border-2 transition-colors duration-300">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundImage: `url(${post.image})` }}
                        />
                        <div
                          className="absolute inset-0 opacity-30 transition-opacity duration-300"
                          style={{ background: `linear-gradient(to bottom, transparent, ${post.categoryColor || 'transparent'})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

                        <div className="absolute inset-0 p-3 flex flex-col justify-end gap-2 transition-opacity duration-300">
                          <span
                            className="inline-flex px-3 py-1 text-white font-semibold text-xs rounded w-fit"
                            style={{ backgroundColor: post.categoryColor || 'rgba(0,0,0,0.35)' }}
                          >
                            {post.category}
                          </span>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/90">
                            <span>{post.date}</span>
                            {post.readingTime ? <span>{post.readingTime} min lettura</span> : null}
                          </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white font-bold flex items-center gap-2 text-sm tracking-wide border-2 border-white/30 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                            LEGGI L'ARTICOLO <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h2 className="text-3xl font-cormorant-garamond font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-lg font-onest text-foreground/70 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
