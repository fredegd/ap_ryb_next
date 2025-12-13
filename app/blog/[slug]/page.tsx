import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/blog"
import { notFound } from "next/navigation"
import { marked } from "marked"

interface PageProps {
    params: {
        slug: string
    }
}

export const dynamicParams = true

export async function generateStaticParams() {
    const slugs = getBlogPostSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)

    if (!post) {
        return {
            title: "Post non trovato",
        }
    }

    return {
        title: `${post.title} - Reset Your Body`,
        description: post.excerpt,
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const htmlContent = marked(post.content)

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

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                        <div className="max-w-4xl mx-auto w-full">
                            <div className="mb-4 flex items-center space-x-4">
                                <span className="inline-block px-3 py-1 bg-accent/90 text-accent-foreground font-semibold text-sm rounded">
                                    {post.category}
                                </span>
                                <span className="text-sm text-white/80">{post.date}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-16 md:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Meta Info */}
                        <div className="mb-12 pb-8 border-b border-border">
                            <p className="text-foreground/70 text-lg">{post.excerpt}</p>
                        </div>

                        {/* Article Content */}
                        <article
                            className="prose prose-invert max-w-none mb-16"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />

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

                {/* Newsletter Section */}
                <Newsletter />
            </main>
            <Footer />
        </div>
    )
}
