# Reset Your Body

Un sito web professionale per lo studio di massoterapia e chinesiologia di Alessandro Paradiso, dedicato al recupero funzionale completo attraverso terapia manuale e movimento guidato.

## 🎯 Descrizione

Reset Your Body è una piattaforma digitale che presenta i servizi di un professionista specializzato nell'unione di **Massoterapia** e **Chinesiologia**. L'approccio si concentra non solo sul sollievo immediato, ma su un reset duraturo del corpo, correggendo la causa dei problemi attraverso terapia manuale e movimento guidato.

Il sito offre:

- Presentazione dei servizi terapeutici e di allenamento personalizzato
- Blog con articoli informativi su recupero, postura e benessere fisico
- Sistema di newsletter per rimanere aggiornati
- Design moderno e responsive con animazioni fluide

## 🏥 Servizi Offerti

- **Personal Training**: Programmi di allenamento personalizzati
- **Recupero Atletico**: Ottimizzazione della performance sportiva
- **Valutazione Posturale**: Analisi e correzione della postura
- **Linfodrenaggio**: Tecniche di drenaggio linfatico manuale
- **Massaggio Decontratturante**: Trattamento delle tensioni muscolari
- **Terapia Dolore Cronico**: Gestione del dolore cronico

## 🛠️ Tecnologie Utilizzate

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Heroicons
- **Theme**: next-themes (supporto dark/light mode)
- **Notifications**: Sonner (toast notifications)

## 📦 Struttura del Progetto

```
├── app/                    # Next.js App Router
│   ├── about/             # Pagina Chi Sono
│   ├── api/               # API routes
│   ├── blog/              # Sezione blog
│   └── servizi/           # Sezione servizi
├── components/            # Componenti React
│   ├── ui/               # Componenti UI riutilizzabili
│   └── ...               # Componenti delle sezioni
├── content/              # Contenuti Markdown
│   ├── blog/            # Articoli del blog
│   └── servizi/         # Descrizioni servizi
├── lib/                 # Utility e helpers
└── public/              # Asset statici
```

## 🚀 Installazione e Avvio

### Prerequisiti

- Node.js 18+
- npm o yarn

### Comandi

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Avvia il server di produzione
npm start

# Linting
npm run lint
```

Il sito sarà disponibile su [http://localhost:3000](http://localhost:3000).

## 🎨 Caratteristiche

- ✅ Design responsive e mobile-first
- ✅ Supporto tema scuro/chiaro
- ✅ Animazioni fluide e interattive
- ✅ SEO ottimizzato
- ✅ Accessibilità (WCAG)
- ✅ Performance ottimizzate
- ✅ Gestione contenuti tramite Markdown
- ✅ Sistema di newsletter integrato
- ✅ Navigazione dinamica e breadcrumb

## 📝 Gestione Contenuti

I contenuti del blog e dei servizi sono gestiti tramite file Markdown nella cartella `content/`:

- `content/blog/` - Articoli del blog
- `content/servizi/` - Descrizioni dei servizi

Ogni file Markdown include un frontmatter con metadati come titolo, slug, immagine e descrizione.

## 🌐 Deployment

Il progetto è ottimizzato per il deployment su [Vercel](https://vercel.com), la piattaforma dei creatori di Next.js.

## 📄 Licenza

Questo progetto è privato e di proprietà di Alessandro Paradiso.

## 👤 Autore

**Alessandro Paradiso**  
Massoterapista e Chinesiologo  
Studio: Reset Your Body

---

Sviluppato con ❤️ usando Next.js e TypeScript
