import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Blog } from "@/components/blog"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/BackgroundAnimation"
import { getFeaturedServices } from "@/lib/services"
import { getFeaturedBlogPosts } from "@/lib/blog"
import { getAuthorById, getPageSettings } from "@/lib/contentful"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const pageSettings = await getPageSettings("AP-Massoterapia - Home")
  return {
    title: pageSettings?.seoTitle || " Alessandro Paradiso Massoterapia Chinesiologia",
    description: pageSettings?.seoDescription || "Studio Professionale di Massoterapia e Chinesiologia gestito da Alessandro Paradiso",
  }
}

export default async function Home() {
  const services = (await getFeaturedServices()).slice(0, 4)
  const posts = (await getFeaturedBlogPosts()).slice(0, 4)

  const authorId = process.env.AUTHOR_ENTRY_ID || ""
  const author = await getAuthorById(authorId)

  return (
    <div className="min-h-screen">
      <BackgroundAnimation />
      <Hero />
      <About
        name={author?.name ?? "Alessandro Paradiso"}
        slogan={author?.slogan}
        bio={author?.bio}
      />
      <Services services={services} />
      <Blog posts={posts} />
      <Footer />
    </div>
  )
}
