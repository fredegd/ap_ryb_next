
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <Link key={service.slug} href={`/servizi/${service.slug}`}>
                  <div
                    className="group relative overflow-hidden rounded-lg h-96 cursor-pointer border-2 transition-colors duration-300"
                    style={{ borderColor: service.categoryColor || 'transparent' }}
                  >
                    {/* Service image */}
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Mild Color Overlay */}
                    <div
                      className="absolute inset-0 opacity-30 transition-opacity duration-300 pointer-events-none"
                      style={{ background: `linear-gradient(to bottom, transparent, ${service.categoryColor || 'transparent'})` }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 group-hover:to-black/80 transition-all duration-300"></div>

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                      <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                        <p className="text-white/80 text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-0 line-clamp-3">
                          {service.description}
                        </p>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="text-primary font-bold flex items-center gap-2 text-sm bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/50">
                          SCOPRI IL SERVIZIO <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/10 py-32">
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
