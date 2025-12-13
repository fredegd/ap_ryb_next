"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getBlogPostsClient } from "@/lib/blog-client"
import type { BlogPost } from "@/lib/blog"

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getBlogPostsClient().then((data) => {
      setPosts(data.slice(0, 3))
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <section id="blog" className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">DAL MIO BLOG</h2>
          <div className="text-center text-foreground/70">Caricamento...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">DAL MIO BLOG</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="group relative overflow-hidden rounded-lg h-96 cursor-pointer">
                {/* Blog image */}
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 group-hover:to-black/80 transition-all duration-300"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div></div>
                  <div>
                    <p className="text-white/70 text-sm mb-2 uppercase">{post.category}</p>
                    <h3 className="text-white font-bold text-xl">{post.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
