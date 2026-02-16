import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/lib/services"

interface ServiceCardProps {
    service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Link href={`/servizi/${service.slug}`}>
            <div className="group relative overflow-hidden rounded-lg h-96 cursor-pointer transition-colors duration-300">
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
                        <h3 className="text-white font-cormorant-garamond font-semibold text-xl mb-2">{service.title}</h3>
                        <p className="text-white/80 font-onest text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-0 line-clamp-3">
                            {service.description}
                        </p>
                    </div>

                    <div className="absolute inset-0 flex items-start justify-center pt-[25%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="text-primary group-hover:bg-accent font-passion-one font-semibold flex items-center gap-2 text-xs bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/50 transition-colors uppercase tracking-wide">
                            Scopri il Servizio <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
