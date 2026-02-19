import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { getServiceBySlug, getServiceSlugs } from "@/lib/services"
import { notFound } from "next/navigation"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import { CheckCircle, Info, AlertTriangle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceGalleryCarousel } from "@/components/servizi/service-gallery-carousel"
import { ServiceKeyDetailsSticky } from "@/components/servizi/service-key-details-sticky"

interface PageProps {
    params: {
        slug: string
    }
}

const richTextOptions = {
    renderNode: {
        [BLOCKS.HEADING_2]: (node: any, children: any) => <h2 className="text-3xl font-cormorant-garamond font-semibold mb-6 flex items-center">{children}</h2>,
        [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="font-onest mb-4">{children}</p>,
    },
}

export const dynamicParams = true

export async function generateStaticParams() {
    const slugs = await getServiceSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const service = await getServiceBySlug(slug)

    if (!service) {
        return {
            title: "Servizio non trovato",
        }
    }

    const imageUrl = service.image || '/opengraph-image.png'

    return {
        title: `${service.title} - Reset Your Body`,
        description: service.excerpt,
        openGraph: {
            type: 'website',
            locale: 'it_IT',
            url: `https://resetyourbody.it/servizi/${slug}`,
            siteName: 'Reset Your Body',
            title: service.title,
            description: service.excerpt,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: service.title,
            description: service.excerpt,
            images: [imageUrl],
        },
    }
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params
    const service = await getServiceBySlug(slug)

    if (!service) {
        notFound()
    }

    const richContent = documentToReactComponents(service.content, richTextOptions)

    return (
        <div className="min-h-screen ">
            <main>
                {/* Hero Section with Image */}
                <section className="relative w-full h-96 md:h-[500px] ">
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
                            <h1 className="text-4xl md:text-5xl font-passion-one font-normal text-white mb-4 uppercase tracking-wide">{service.title}</h1>
                            <p className="text-lg font-onest text-white/90">{service.excerpt}</p>
                        </div>
                    </div>
                </section>

                {/* Service Content */}
                <section className="py-16 md:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        {/* Key Details Cards */}
                        <ServiceKeyDetailsSticky
                            duration={service.duration}
                            price={service.price}
                            priceDescription={service.priceDescription}
                            bookingLink={service.bookingLink}
                        />
                        {/* Detailed Description */}
                        <div className="prose prose-invert max-w-none space-y-6 text-lg text-foreground/80 leading-relaxed mb-16">
                            {richContent}
                        </div>

                        {/* How It Works */}
                        {service.howDoesItWork && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-cormorant-garamond font-semibold mb-6 flex items-center">
                                    <Info className="w-8 h-8 text-primary mr-3" />
                                    Come Funziona
                                </h2>
                                <div className="prose prose-invert max-w-none text-foreground/80">
                                    {documentToReactComponents(service.howDoesItWork, richTextOptions)}
                                </div>
                            </div>
                        )}

                        {/* Benefits */}
                        {service.benefits && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-cormorant-garamond font-semibold mb-6 flex items-center">
                                    <CheckCircle className="w-8 h-8 text-primary mr-3" />
                                    Benefici
                                </h2>
                                <div className="prose prose-invert max-w-none text-foreground/80">
                                    {documentToReactComponents(service.benefits, richTextOptions)}
                                </div>
                            </div>
                        )}

                        {/* Who Is It For */}
                        {service.whoIsItFor && (
                            <div className="mb-16 bg-secondary/10 rounded-2xl">
                                <h2 className="text-3xl font-cormorant-garamond font-semibold mb-6">Per Chi È Indicato</h2>
                                <div className="prose prose-invert max-w-none text-foreground/80 ">
                                    {documentToReactComponents(service.whoIsItFor, richTextOptions)}
                                </div>
                            </div>
                        )}

                        {/* Contraindications */}
                        {service.contraindications && (
                            <div className="mb-16 border-l-4 border-destructive pl-6 py-1">
                                <h2 className="text-2xl font-cormorant-garamond font-semibold mb-4 flex items-center text-destructive">
                                    <AlertTriangle className="w-6 h-6 mr-3" />
                                    Controindicazioni
                                </h2>
                                <div className="prose prose-invert max-w-none text-foreground/80">
                                    {documentToReactComponents(service.contraindications, richTextOptions)}
                                </div>
                            </div>
                        )}

                        {/* Treatment Process */}
                        {service.treatmentProcess && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-cormorant-garamond font-semibold mb-6">Come si svolge il Trattamento</h2>
                                <div className="prose prose-invert max-w-none text-foreground/80">
                                    {documentToReactComponents(service.treatmentProcess, richTextOptions)}
                                </div>
                            </div>
                        )}
                            {/* Gallery */}
                            {service.gallery && service.gallery.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-cormorant-garamond font-semibold mb-8">Galleria</h2>
                                <ServiceGalleryCarousel
                                    images={service.gallery}
                                    title={service.title}
                                />
                            </div>
                        )}

                   

                        {/* CTA Section (Moved) */}
                        <div className="py-12 bg-gradient-to-b from-background to-secondary/30 rounded-2xl mb-16 text-center px-6">
                            <h2 className="text-3xl md:text-4xl font-cormorant-garamond font-semibold text-primary mb-6">Pronto a Iniziare il Tuo Reset?</h2>
                            <p className="text-xl font-onest text-foreground/70 mb-8 max-w-2xl mx-auto">
                                Scopri come posso aiutarti a raggiungere il tuo benessere fisico duraturo.
                            </p>
                            <a
                                href={service.bookingLink || "https://calendly.com/your-booking-link"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-passion-one font-semibold text-background bg-primary hover:bg-primary/90 rounded-lg transition-colors uppercase tracking-wide"
                            >
                                Prenota un Appuntamento
                            </a>
                        </div>

                    

                        {/* Testimonials */}
                        {service.testimonials && service.testimonials.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-cormorant-garamond font-semibold mb-8">Dicono di noi</h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {service.testimonials.map((testimonial: any, idx) => (
                                        <Card key={idx} className="bg-secondary/5">
                                            <CardContent className="p-6">
                                                <p className="italic mb-4 text-foreground/90">"{testimonial.testimonialText}"</p>
                                                <div className="flex items-center">
                                                    {testimonial.customerPhoto && (
                                                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                                                            {/* Assuming customerPhoto is resolved to a URL structure similar to assets */}
                                                            {/* NOTE: In mapService we didn't resolving deep assets for customerPhoto, 
                                                                 so we might need to adjust or skip photo if not fully resolved. 
                                                                 For now, strictly text or safe check. */ }
                                                            {/* <Image src={...} /> */}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold">{testimonial.customerName}</p>
                                                        {testimonial.rating && (
                                                            <div className="flex text-yellow-500">
                                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                                    <span key={i}>★</span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FAQs */}
                        {service.faqs && service.faqs.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-cormorant-garamond font-semibold mb-6">Domande Frequenti</h2>
                                <Accordion type="single" collapsible className="w-full">
                                    {service.faqs.map((faq: any, idx) => (
                                        <AccordionItem key={idx} value={`item-${idx}`}>
                                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                                            <AccordionContent className="prose prose-invert max-w-none text-foreground/80">
                                                {documentToReactComponents(faq.answer, richTextOptions)}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        )}

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
