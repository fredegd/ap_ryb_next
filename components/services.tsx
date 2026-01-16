import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/lib/services"

interface ServicesProps {
  services: Service[]
}

export function Services({ services }: ServicesProps) {

  return (
    <section id="services" className="bg-secondary/50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">PERCORSI BENESSERE</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.slug} href={`/servizi/${service.slug}`}>
              <div
                className="group relative overflow-hidden rounded-lg h-96 cursor-pointer transition-colors duration-300"
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
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-0">
                      {service.description.length > 33 ? `${service.description.slice(0, 33)}...` : service.description}
                    </p>
                  </div>

                  <div className="absolute inset-0 flex items-start justify-center pt-[25%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-primary group-hover:bg-accent font-bold flex items-center gap-2 text-sm bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/50 transition-colors">
                      SCOPRI IL SERVIZIO <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/servizi"
            className="inline-flex items-center justify-center rounded-lg border border-primary px-6 py-4 text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Scopri Tutti i Servizi →
          </Link>
        </div>
      </div>
    </section>
  )
}
