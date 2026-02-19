import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/blog"
import { notFound } from "next/navigation"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { ServiceCard } from "@/components/service-card"
import { Clock } from "lucide-react"
import { BackToTop } from "@/components/back-to-top"

interface PageProps {
    params: {
        slug: string
    }
}

export const dynamicParams = true

export async function generateStaticParams() {
    const slugs = await getBlogPostSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const post = await getBlogPostBySlug(slug)

    if (!post) {
        return {
            title: "Post non trovato",
        }
    }

    const imageUrl = post.image || '/opengraph-image.png'

    return {
        title: `${post.title} - Reset Your Body`,
        description: post.excerpt,
        openGraph: {
            type: 'article',
            locale: 'it_IT',
            url: `https://resetyourbody.it/blog/${slug}`,
            siteName: 'Reset Your Body',
            title: post.title,
            description: post.excerpt,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            publishedTime: post.publishDate,
            authors: ['Reset Your Body'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = await getBlogPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const richContent = documentToReactComponents(post.content)

    return (
        <div className="min-h-screen">
            <main>
                {/* Hero Section with Image */}
                <section className="relative w-full h-96 md:h-[500px]">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    <Link
                        href="/blog"
                        className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 rounded-xl bg-black/45 text-white px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all opacity-35 hover:opacity-100 hover:bg-black/75"
                    >
                        ← Torna al Blog
                    </Link>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                        <div className="max-w-4xl mx-auto w-full">
                            <h1 className="text-4xl md:text-5xl font-passion-one font-normal text-white mb-4 uppercase tracking-wide">{post.title}</h1>
                        </div>
                    </div>
                </section>

                {/* Meta Below Image */}
                <section className="py-6 md:py-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center gap-4">
                            <span
                                className="inline-block px-3 py-1 text-accent-foreground font-semibold text-sm rounded"
                                style={{ backgroundColor: post.categoryColor || "transparent" }}
                            >
                                {post.category}
                            </span>
                            <span className="text-sm text-foreground/70">{post.date}</span>
                            {post.readingTime && (
                                <span className="flex items-center text-sm text-foreground/70 gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.readingTime} min
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-16 md:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Meta Info */}
                        <div className="mb-12 pb-8 border-b border-border">
                            <p className="font-onest text-foreground/70 text-lg">{post.excerpt}</p>
                        </div>

                        {/* Article Content */}
                        <article className="prose prose-invert max-w-none mb-16">
                            {richContent}
                        </article>

                        {/* Navigation */}
                        <div className="pt-8 border-t border-border">
                            <Link href="/blog">
                                <button className="text-primary font-semibold hover:text-primary/80 transition-colors flex items-center gap-2">
                                    ← Torna al Blog
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                {post.relatedServices && post.relatedServices.length > 0 && (
                    <section className="py-12 bg-secondary/20">
                        <div className="max-w-8xl mx-auto xl:mx-34 px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-cormorant-garamond font-semibold text-center mb-10 text-primary">
                                Servizi Correlati
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {post.relatedServices.map((service) => (
                                    <ServiceCard key={service.id} service={service} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Newsletter Section */}
                <Newsletter />
                <BackToTop />
            </main>
            <Footer />
        </div>
    )
}
