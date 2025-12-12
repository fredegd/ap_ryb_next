"use client"

export function About() {
  return (
    <section id="about" className="bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">ALESSANDRO PARADISO</h2>
        <h3 className="text-2xl font-bold text-foreground mb-8 text-center">TERAPIA E MOVIMENTO</h3>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <p>
            Benvenuti nello studio dove la <span className="font-semibold">Massoterapia</span> si unisce alla{" "}
            <span className="font-semibold">Chinesiologia</span> per un recupero funzionale completo. Il mio approccio
            non si limita al sollievo immediato, ma mira a un reset duraturo del tuo corpo, correggendo la causa del
            problema attraverso la terapia manuale e il movimento guidato.
          </p>

          <p>
            Offro un percorso personalizzato per atleti, professionisti e chiunque cerchi di migliorare il proprio
            benessere fisico. Dalla gestione del dolore cronico all'ottimizzazione della performance sportiva, il focus
            è sempre sul ripristino dell'equilibrio e della funzionalità corporea.
          </p>
        </div>
      </div>
    </section>
  )
}
