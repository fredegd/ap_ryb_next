
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { getAllServices } from "@/lib/services"
import { getAuthorById } from "@/lib/contentful"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servizi - Reset Your Body",
  description: "Scopri i percorsi benessere offerti da Alessandro Paradiso",
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://resetyourbody.ch/servizi',
    siteName: 'Reset Your Body',
    title: 'Servizi - Reset Your Body',
    description: 'Scopri i percorsi benessere offerti da Alessandro Paradiso',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Servizi - Reset Your Body',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servizi - Reset Your Body',
    description: 'Scopri i percorsi benessere offerti da Alessandro Paradiso',
    images: ['/opengraph-image.png'],
  },
}

export default async function ServiziPage() {
  const services = await getAllServices()
  const authorId = process.env.AUTHOR_ENTRY_ID
  const author = authorId ? await getAuthorById(authorId) : null

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-linear-to-b from-secondary/30 to-background py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-primary mb-6 text-center">PERCORSI BENESSERE</h1>
            <p className="text-lg text-foreground/70 text-center max-w-2xl mx-auto">
              Scopri i nostri servizi specializzati, progettati per aiutarti a raggiungere il massimo benessere fisico e
              mentale.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {services.map((service) => (
                <article key={service.id} className="border-b border-border pb-12 last:border-b-0">
                  <Link href={`/servizi/${service.slug}`} className="block group">
                    <div
                      className="relative h-64 mb-6 rounded-lg overflow-hidden border-2 transition-colors duration-300"
                      style={{ borderColor: service.categoryColor || 'transparent' }}
                    >
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />

                      {/* Mild Color Overlay */}
                      <div
                        className="absolute inset-0 opacity-30 transition-opacity duration-300"
                        style={{ background: `linear-gradient(to bottom, transparent, ${service.categoryColor || 'transparent'})` }}
                      />

                      {/* Dark Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

                      {/* Hover Overlay Content */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold flex items-center gap-2 text-lg tracking-wide border-2 border-white/30 bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full">
                          SCOPRI IL SERVIZIO <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>

                      {service.serviceCategories.length > 0 ? (
                        <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
                          {service.serviceCategories.map((category) => (
                            <span
                              key={category}
                              className="inline-block px-3 py-1 bg-accent/90 text-white font-semibold text-sm rounded"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                  </Link>
                  <p className="text-lg text-foreground/70 mb-6 leading-relaxed">{service.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/10 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Pronto a Resettare il Tuo Corpo?</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Contattami per prenotare la tua prima sessione di consulenza.
            </p>
            <a
              href={author?.bookingLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
            >
              Prenota Ora
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
