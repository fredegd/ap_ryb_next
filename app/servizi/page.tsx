
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { getAllServices } from "@/lib/services"

export const metadata = {
  title: "Servizi - Reset Your Body",
  description: "Scopri i percorsi benessere offerti da Alessandro Paradiso",
}

export default function ServiziPage() {
  const services = getAllServices()

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-20">
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
                  <Link href={`/servizi/${service.slug}`}>
                    <h2 className="text-3xl font-bold text-foreground mb-4 hover:text-primary transition-colors cursor-pointer">
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
