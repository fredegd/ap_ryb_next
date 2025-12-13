import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Blog } from "@/components/blog"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/BackgroundAnimation"
import { getAllServices } from "@/lib/services"
import { getAllBlogPosts } from "@/lib/blog"

export default function Home() {
  const services = getAllServices().slice(0, 4)
  const posts = getAllBlogPosts().slice(0, 3)

  return (
    <div className="min-h-screen">
      <BackgroundAnimation />
      <Hero />
      <About />
      <Services services={services} />
      <Blog posts={posts} />
      <Footer />
    </div>
  )
}
