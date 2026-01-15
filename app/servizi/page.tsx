
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { getAllServices } from "@/lib/services"
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
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      {service.serviceCategories.length > 0 ? (
                        <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
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
                  <Link href={`/servizi/${service.slug}`}>
                    <button className="text-primary font-semibold hover:text-primary/80 transition-colors">
                      Scopri il Servizio →
                    </button>
                  </Link>
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
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Prenota Ora
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
