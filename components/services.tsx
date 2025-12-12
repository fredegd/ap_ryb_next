"use client"

export function Services() {
  const services = [
    {
      title: "Massaggio Decontratturante",
      description:
        "Questo massaggio terapeutico mira a contratture e nodi muscolari, comuni dopo l'attività fisica o a...",
    },
    {
      title: "Linfodrenaggio",
      description:
        "La tecnica di massaggio dolce indicata a stimolare il sistema linfatico, fondamentale per la dis...",
    },
    {
      title: "Valutazione Posturale",
      description:
        "Una valutazione dettagliata della postura del tuo corpo, che identifica squilibri e disallineamenti...",
    },
    {
      title: "Personal Training",
      description:
        "Allineamenti e tue aspirazioni di fitness con i nostri programmi di allenamento personalizzati, saprai...",
    },
  ]

  return (
    <section id="services" className="bg-secondary/50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">PERCORSI BENESSERE</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg h-80 cursor-pointer">
              {/* Background image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 to-primary/60 group-hover:from-foreground/50 group-hover:to-primary/70 transition-all duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">Vedi Tutti i Servizi</h3>
        </div>
      </div>
    </section>
  )
}
