import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { getServiceBySlug, getServiceSlugs } from "@/lib/services"
import { notFound } from "next/navigation"
import { marked } from "marked"

interface PageProps {
    params: {
        slug: string
    }
}

export const dynamicParams = true

export async function generateStaticParams() {
    const slugs = getServiceSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const service = getServiceBySlug(slug)

    if (!service) {
        return {
            title: "Servizio non trovato",
        }
    }

    return {
        title: `${service.title} - Reset Your Body`,
        description: service.excerpt,
    }
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params
    const service = getServiceBySlug(slug)

    if (!service) {
        notFound()
    }

    const htmlContent = marked(service.content)

    return (
        <div className="min-h-screen">
            <main>
                {/* Hero Section with Image */}
                <section className="relative w-full h-96 md:h-[500px]">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                        <div className="max-w-4xl mx-auto w-full">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
                            <p className="text-lg text-white/90">{service.excerpt}</p>
                        </div>
                    </div>
                </section>

                {/* Service Content */}
                <section className="py-16 md:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <article className="prose prose-invert max-w-none">
                            <div
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
                                className="space-y-6 text-lg text-foreground/80 leading-relaxed"
                            />
                        </article>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-primary/10 py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Pronto a Iniziare?</h2>
                        <p className="text-lg text-foreground/70 mb-8">
                            Contattami per prenotare una sessione di {service.title.toLowerCase()}.
                        </p>
                        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                            Prenota Ora
                        </button>
                    </div>
                </section>

                {/* Back to Services Link */}
                <section className="py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/servizi" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                            ← Torna ai Servizi
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
