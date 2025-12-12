"use client"

export function Blog() {
  const posts = [
    {
      title: "Post Blog 1",
      category: "Wellness",
    },
    {
      title: "Post Blog 2",
      category: "Training",
    },
    {
      title: "Post Blog 3",
      category: "Recovery",
    },
  ]

  return (
    <section id="blog" className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">DAL MIO BLOG</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg h-96 cursor-pointer">
              {/* Background image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-b from-muted to-primary/40 group-hover:from-muted/80 group-hover:to-primary/50 transition-all duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div></div>
                <div>
                  <p className="text-white/70 text-sm mb-2 uppercase">{post.category}</p>
                  <h3 className="text-white font-bold text-xl">{post.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
