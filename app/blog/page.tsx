import Link from "next/link"
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
    url: 'https://resetyourbody.ch/blog',
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
            <h1 className="text-5xl font-bold text-primary mb-6 text-center">DAL MIO BLOG</h1>
            <p className="text-lg text-foreground/70 text-center max-w-2xl mx-auto">
              Articoli e guide su wellness, training, e recupero fisico per aiutarti a ottenere il massimo dal tuo
              corpo.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {posts.map((post) => (
                <article key={post.id} className="border-b border-border pb-12 last:border-b-0">
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center space-x-4">
                        <span className="inline-block px-3 py-1 bg-accent/90 text-white font-semibold text-sm rounded">
                          {post.category}
                        </span>
                        <span className="text-sm text-white/90">{post.date}</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-lg text-foreground/70 mb-6 leading-relaxed">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <button className="text-primary font-semibold hover:text-primary/80 transition-colors">
                      Leggi Articolo →
                    </button>
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
