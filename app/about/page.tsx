
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Chi Sono - Reset Your Body",
  description: "Conosci Alessandro Paradiso e il suo approccio unico alla terapia e al movimento",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-primary mb-6 text-center">ALESSANDRO PARADISO</h1>
            <p className="text-2xl text-foreground/70 text-center">TERAPIA E MOVIMENTO</p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">La Mia Visione</h2>
                <p className="text-lg text-foreground/70 leading-relaxed mb-4">
                  Benvenuti nello studio dove la <span className="font-semibold">Massoterapia</span> si unisce alla{" "}
                  <span className="font-semibold">Chinesiologia</span> per un recupero funzionale completo. Il mio
                  approccio non si limita al sollievo immediato, ma mira a un reset duraturo del tuo corpo, correggendo
                  la causa del problema attraverso la terapia manuale e il movimento guidato.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">L'Approccio Olistico</h2>
                <p className="text-lg text-foreground/70 leading-relaxed mb-4">
                  Offro un percorso personalizzato per atleti, professionisti e chiunque cerchi di migliorare il proprio
                  benessere fisico. Dalla gestione del dolore cronico all'ottimizzazione della performance sportiva, il
                  focus è sempre sul ripristino dell'equilibrio e della funzionalità corporea.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Per Chi Lavoro</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-3">Atleti e Sportivi</h3>
                    <p className="text-foreground/70">
                      Optimizzo la performance e riduco il rischio di infortuni attraverso valutazioni posturali
                      specifiche e programmi di recupero mirati.
                    </p>
                  </div>
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-3">Professionisti</h3>
                    <p className="text-foreground/70">
                      Gestisco le tensioni derivanti da lavoro sedentario e stress, ripristinando l'equilibrio muscolare
                      e la funzionalità corporea.
                    </p>
                  </div>
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-3">Pazienti Cronici</h3>
                    <p className="text-foreground/70">
                      Offro un approccio integrato per gestire il dolore cronico e migliorare la qualità della vita
                      quotidiana.
                    </p>
                  </div>
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-3">Chi Cerchi Benessere</h3>
                    <p className="text-foreground/70">
                      Chiunque desideri investire nella propria salute e raggiungere un equilibrio corpo-mente duraturo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary mb-4">La Promessa</h2>
                <p className="text-lg text-foreground/70">
                  Non offro semplici soluzioni temporanee. Offro un reset vero e proprio: un percorso che ti restituisce
                  il controllo del tuo corpo, eliminando la causa del problema e non solo il sintomo. Il risultato è un
                  benessere duraturo che cambia il tuo stile di vita.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">Pronto a Iniziare il Tuo Reset?</h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Prenota un appuntamento e scopri come posso aiutarti a raggiungere il tuo benessere fisico duraturo.
            </p>
            <a
              href="https://calendly.com/your-booking-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-background bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            >
              Prenota un Appuntamento
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
