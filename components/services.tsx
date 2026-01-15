import Link from "next/link"
import Image from "next/image"
import type { Service } from "@/lib/services"

interface ServicesProps {
  services: Service[]
}

export function Services({ services }: ServicesProps) {

  return (
    <section id="services" className="bg-secondary/50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">PERCORSI BENESSERE</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.slug} href={`/servizi/${service.slug}`}>
              <div className="group relative overflow-hidden rounded-lg h-80 cursor-pointer">
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
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/servizi"
            className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Vedi Tutti i Servizi →
          </Link>
        </div>
      </div>
    </section>
  )
}
