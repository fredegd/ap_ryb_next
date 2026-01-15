import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Blog } from "@/components/blog"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/BackgroundAnimation"
import { getAllServices } from "@/lib/services"
import { getAllBlogPosts } from "@/lib/blog"
import { getAuthorById } from "@/lib/contentful"

export default async function Home() {
  const services = (await getAllServices()).slice(0, 4)
  const posts = (await getAllBlogPosts()).slice(0, 4)

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
