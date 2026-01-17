
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
    url: 'https://resetyourbody.it/servizi',
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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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

        {/* Services Grouped by Category */}
        <div className="flex flex-col">
          {(() => {
            // Group services by category
            const groups: Record<string, { color?: string; services: typeof services }> = {};
            const noCategoryServices: typeof services = [];

            services.forEach((service) => {
              if (service.categories && service.categories.length > 0) {
                service.categories.forEach((category) => {
                  if (!groups[category.name]) {
                    groups[category.name] = {
                      color: category.color,
                      services: [],
                    };
                  }
                  groups[category.name].services.push(service);
                });
              } else {
                noCategoryServices.push(service);
              }
            });

            // Prepare sections to render
            const sections = Object.entries(groups).map(([name, group]) => ({
              name,
              ...group,
            }));

            // Add "Altro" section if there are services without category
            if (noCategoryServices.length > 0) {
              sections.push({
                name: "Altro",
                color: undefined, // Default color or specific one
                services: noCategoryServices,
              });
            }

            return sections.map((section) => (
              <section
                key={section.name}
                id={section.name.toLowerCase().replace(/\s+/g, '-')}
                className="py-20"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2
                    className="text-3xl font-bold mb-10 drop-shadow-md inline-block border-b-4 pb-2"
                    style={{ borderColor: section.color || 'var(--primary)' }}
                  >
                    {section.name.toUpperCase()}
                  </h2>

                  <Carousel
                    opts={{
                      align: "center",
                      loop: true,
                    }}
                    className="w-full relative"
                  >
                    <CarouselContent className="-ml-4">
                      {section.services.map((service) => (
                        <CarouselItem
                          key={`${section.name}-${service.slug}`}
                          className="pl-4 basis-[66.66%] md:basis-[40%] lg:basis-[28.57%]"
                        >
                          <Link href={`/servizi/${service.slug}`}>
                            <div
                              className="group relative overflow-hidden rounded-lg h-96 cursor-pointer transition-colors duration-300 bg-background"
                            >
                              {/* Service image */}
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />

                              {/* Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 group-hover:to-black/80 transition-all duration-300"></div>

                              {/* Content */}
                              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                                  <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                                  <p className="text-white/80 text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-0 line-clamp-3">
                                    {service.description}
                                  </p>
                                </div>

                                <div className="absolute inset-x-0 top-1/4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                  <span className="pointer-events-auto text-primary font-bold flex items-center gap-2 text-sm bg-black/40 group-hover:bg-accent group-hover:text-accent-foreground backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/50 transition-colors">
                                    SCOPRI IL SERVIZIO <ArrowRight className="w-4 h-4" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className={`hidden md:flex left-4 z-30 w-16 h-8 dark:hover:bg-accent dark:hover:text-accent-foreground ${section.services.length <= 3 ? "lg:hidden" : ""}`} />
                    <CarouselNext className={`hidden md:flex right-4 z-30 w-16 h-8 dark:hover:bg-accent dark:hover:text-accent-foreground ${section.services.length <= 3 ? "lg:hidden" : ""}`} />

                    {/* Gradient Overlays for Desktop/Tablet */}
                    <div className="hidden md:block absolute left-0 top-0 bottom-0 z-20 pointer-events-none w-[10%] bg-gradient-to-r from-background to-transparent" />
                    <div className="hidden md:block absolute right-0 top-0 bottom-0 z-20 pointer-events-none w-[10%] bg-gradient-to-l from-background to-transparent" />
                  </Carousel>
                </div>
              </section>
            ));
          })()}
        </div>

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
