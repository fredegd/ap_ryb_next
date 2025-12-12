
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Servizi - Reset Your Body",
  description: "Scopri i percorsi benessere offerti da Alessandro Paradiso",
}

export default function ServiziPage() {
  const services = [
    {
      title: "Massaggio Decontratturante",
      description:
        "Un massaggio terapeutico profondo che mira a contratture e nodi muscolari, perfetto dopo l'attività fisica o per tensioni croniche. Utilizza tecniche specifiche per ripristinare la funzionalità muscolare.",
      benefits: ["Riduce le contratture", "Migliora la circolazione", "Allevia il dolore", "Ripristina la mobilità"],
    },
    {
      title: "Linfodrenaggio",
      description:
        "Una tecnica di massaggio delicato indicata per stimolare il sistema linfatico. Fondamentale per la disintossicazione naturale del corpo e il supporto del sistema immunitario.",
      benefits: ["Elimina le tossine", "Riduce il gonfiore", "Rinforza l'immunità", "Aumenta l'energia"],
    },
    {
      title: "Valutazione Posturale",
      description:
        "Una valutazione dettagliata della postura del tuo corpo che identifica squilibri e disallineamenti. Essenziale per prevenire dolori e ottimizzare le prestazioni.",
      benefits: ["Identifica squilibri", "Previene infortuni", "Migliora la performance", "Correzione posturale"],
    },
    {
      title: "Personal Training",
      description:
        "Programmi di allenamento personalizzati allineati alle tue aspirazioni di fitness. Allenamenti su misura che combinano forza, flessibilità e consapevolezza corporea.",
      benefits: ["Piano personalizzato", "Supporto costante", "Risultati garantiti", "Trasformazione fisica"],
    },
    {
      title: "Terapia del Dolore Cronico",
      description:
        "Un approccio integrato per gestire il dolore cronico mediante una combinazione di terapia manuale e movimento guidato.",
      benefits: [
        "Gestione del dolore",
        "Recupero funzionale",
        "Riduzione della rigidità",
        "Migliore qualità della vita",
      ],
    },
    {
      title: "Recupero Atletico",
      description:
        "Programmi specifici per atleti che desiderano recuperare da infortuni e ottimizzare la loro performance sportiva.",
      benefits: ["Ritorno al fitness", "Prevenzione infortuni", "Ottimizzazione performance", "Recupero accelerato"],
    },
  ]

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-primary mb-6 text-center">PERCORSI BENESSERE</h1>
            <p className="text-lg text-foreground/70 text-center max-w-2xl mx-auto">
              Scopri i nostri servizi specializzati, progettati per aiutarti a raggiungere il massimo benessere fisico e
              mentale.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <div key={index} className="flex flex-col">
                  <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                  <p className="text-foreground/70 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-2">
                    {service.benefits.map((benefit, bIndex) => (
                      <div key={bIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-foreground/80">{benefit}</span>diocan
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/10 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Pronto a Resettare il Tuo Corpo?</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Contattami per prenotare la tua prima sessione di consulenza.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Prenota Ora
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
