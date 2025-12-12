import { Footer } from "@/components/footer"

export const metadata = {
  title: "Blog - Reset Your Body",
  description: "Leggi gli ultimi articoli su wellness, training e recupero fisico",
}

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "5 Esercizi Essenziali per Migliorare la Postura",
      category: "Training",
      date: "15 Novembre 2024",
      excerpt:
        "Scopri i 5 esercizi fondamentali che puoi fare a casa per correggere la tua postura e prevenire problemi di schiena.",
      content: `La postura corretta è la base di un corpo sano. In questo articolo, esploriamo i 5 esercizi più efficaci per migliorare l'allineamento del corpo e ridurre la tensione muscolare...`,
    },
    {
      id: 2,
      title: "Il Linfodrenaggio: Cos'è e Perché Farlo",
      category: "Wellness",
      date: "10 Novembre 2024",
      excerpt:
        "Una guida completa al linfodrenaggio: come funziona, i benefici e come può aiutarti a disintossicare il corpo naturalmente.",
      content: `Il sistema linfatico è cruciale per la salute generale del corpo. Il linfodrenaggio stimola questo sistema per eliminare le tossine e migliorare la funzione immunitaria...`,
    },
    {
      id: 3,
      title: "Recupero Post-Infortunio: La Guida Completa",
      category: "Recovery",
      date: "5 Novembre 2024",
      excerpt:
        "Come recuperare efficacemente da un infortunio sportivo combinando terapia manuale e movimento guidato.",
      content: `Il recupero da un infortunio richiede un approccio sistemico. Questo articolo copre le fasi del recupero, gli esercizi consigliati e come monitorare i progressi...`,
    },
    {
      id: 4,
      title: "Stress e Tensione Muscolare: La Connessione Nascosta",
      category: "Wellness",
      date: "1 Novembre 2024",
      excerpt:
        "Scopri come lo stress emotivo si manifesta nel corpo come tensione muscolare e come affrontare il problema alla radice.",
      content: `Lo stress non è solo mentale; influenza direttamente il nostro corpo. Quando siamo stressati, i muscoli si contraggono e rimangono tesi. Questo articolo esplora questa connessione...`,
    },
    {
      id: 5,
      title: "Personal Training: Come Iniziare il Tuo Percorso",
      category: "Training",
      date: "25 Ottobre 2024",
      excerpt:
        "Una guida per principianti su come avviare un programma di personal training personalizzato e raggiungere i tuoi obiettivi di fitness.",
      content: `Iniziare un programma di personal training può essere intimidatorio. Questo articolo ti guida attraverso i primi passi, da una valutazione iniziale agli esercizi di base...`,
    },
    {
      id: 6,
      title: "L'Importanza del Recupero Attivo",
      category: "Recovery",
      date: "20 Ottobre 2024",
      excerpt:
        "Perché il recupero attivo è essenziale per la performance e come incorporarlo nella tua routine settimanale.",
      content: `Il recupero attivo non significa fare nulla. Si tratta di attività leggere che accelerano il recupero e migliorano la performance. Scopri i migliori esercizi di recupero...`,
    },
  ]

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-primary mb-6 text-center">DAL MIO BLOG</h1>
            <p className="text-lg text-foreground/70 text-center max-w-2xl mx-auto">
              Articoli e guide su wellness, training, e recupero fisico per aiutarti a ottenere il massimo dal tuo
              corpo.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {posts.map((post) => (
                <article key={post.id} className="border-b border-border pb-12 last:border-b-0">
                  <div className="mb-4 flex items-center space-x-4">
                    <span className="inline-block px-3 py-1 bg-accent/20 text-accent font-semibold text-sm rounded">
                      {post.category}
                    </span>
                    <span className="text-sm text-foreground/50">{post.date}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4 hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-lg text-foreground/70 mb-6 leading-relaxed">{post.excerpt}</p>
                  <button className="text-primary font-semibold hover:text-primary/80 transition-colors">
                    Leggi Articolo →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-primary/10 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Rimani Aggiornato</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Iscriviti alla newsletter per ricevere i nuovi articoli direttamente nella tua casella di posta.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Iscriviti
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
