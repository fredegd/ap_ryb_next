import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Blog } from "@/components/blog"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/BackgroundAnimation"

export default function Home() {
  return (
    <div className="min-h-screen">
      <BackgroundAnimation />
      <Hero />
      <About />
      <Services />
      <Blog />
      <Footer />
    </div>
  )
}
