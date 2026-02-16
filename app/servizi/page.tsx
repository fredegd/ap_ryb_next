
import { Footer } from "@/components/footer"
import { getAllServices } from "@/lib/services"
import { getAuthorById } from "@/lib/contentful"
import type { Metadata } from "next"
import { ServicesCarousel } from "@/components/servizi/services-carousel"

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

export default async function ServiziPage() {
  const services = await getAllServices()
  const authorId = process.env.AUTHOR_ENTRY_ID
  const author = authorId ? await getAuthorById(authorId) : null

  return (
    <div className="min-h-screen">
      <main className="overflow-x-clip">
        {/* Hero Section */}
        <section className="bg-linear-to-b from-secondary/30 to-background py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-passion-one font-normal text-primary mb-6 text-center uppercase tracking-wide">Percorsi Benessere</h1>
            <p className="text-lg font-onest text-foreground/70 text-center max-w-2xl mx-auto">
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
                className="pt-14 pb-8 relative overflow-visible z-0 hover:z-20 transition-[z-index]"
              >
                <div className="max-w-8xl mx-auto xl:mx-34 px-4 sm:px-6 lg:px-8">
                  <h2
                    className="text-3xl font-cormorant-garamond font-medium mb-6 drop-shadow-md inline-block border-b-4 pb-2"
                    style={{ borderColor: section.color || 'var(--primary)' }}
                  >
                    {section.name.toUpperCase()}
                  </h2>
                  <ServicesCarousel sectionName={section.name} services={section.services} />
                </div>
              </section>
            ));
          })()}
        </div>

        {/* CTA Section */}
        <section className="bg-primary/10 py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-cormorant-garamond font-medium text-foreground mb-6">Pronto a Resettare il Tuo Corpo?</h2>
            <p className="text-lg font-onest text-foreground/70 mb-8">
              Contattami per prenotare la tua prima sessione di consulenza.
            </p>
            <a
              href={author?.bookingLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-passion-one font-semibold hover:bg-primary/90 transition-colors inline-block uppercase tracking-wide"
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
