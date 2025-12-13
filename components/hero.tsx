"use client"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-32 md:py-48">
      {/* Decorative blur circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl -z-10 dark:opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10 dark:opacity-50"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 dark:opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-8 text-accent">RESET</h1>
        <h2 className="text-4xl md:text-5xl font-light text-muted-foreground mb-8">YOUR BODY</h2>
        <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">
          Alessandro Paradiso | Massoterapia | Chinesiologia
        </p>
        <button className="px-8 py-3 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
          SCOPRI I SERVIZI
        </button>
      </div>
    </section>
  )
}
