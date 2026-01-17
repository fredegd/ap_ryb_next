import { Footer } from "@/components/footer"
import { getAuthorById } from "@/lib/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, Document } from "@contentful/rich-text-types"
import { marked } from "marked"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chi Sono - Reset Your Body",
  description: "Conosci Alessandro Paradiso e il suo approccio unico alla terapia e al movimento",
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://resetyourbody.it/about',
    siteName: 'Reset Your Body',
    title: 'Chi Sono - Reset Your Body',
    description: 'Conosci Alessandro Paradiso e il suo approccio unico alla terapia e al movimento',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Alessandro Paradiso - Reset Your Body',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chi Sono - Reset Your Body',
    description: 'Conosci Alessandro Paradiso e il suo approccio unico alla terapia e al movimento',
    images: ['/opengraph-image.png'],
  },
}

export default async function AboutPage() {
  const authorId = process.env.AUTHOR_ENTRY_ID

  if (!authorId) {
    return <div>Author ID not configured</div>
  }

  const author = await getAuthorById(authorId)

  if (!author) {
    return <div>Author not found</div>
  }

  const richTextOptions = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="text-3xl font-bold text-primary mb-6 mt-12 first:mt-0">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <h3 className="text-2xl font-bold text-primary mb-4 mt-8">{children}</h3>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="text-lg text-foreground/70 leading-relaxed mb-4">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-foreground/70">{children}</ul>
      ),
    },
  }

  const promiseHtml = author.promise ? await marked(author.promise) : ""

  return (
    <div className="min-h-screen">

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-primary mb-6 text-center uppercase">{author.name}</h1>
            {author.slogan && (
              <p className="text-2xl text-foreground/70 text-center uppercase mb-8">{author.slogan}</p>
            )}
            {author.profileImageUrl && (
              <div className="relative w-full aspect-4/3 rounded-md mx-auto overflow-hidden border-2 border-primary/20 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={author.profileImageUrl}
                  alt={author.name}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

          </div>
        </section>

        {/* About Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">

              {/* Bio RichText */}
              <div>
                {author.bio && documentToReactComponents(author.bio, richTextOptions)}
              </div>

              {/* Target Groups / Per Chi Lavoro */}
              {author.targetGroups && author.targetGroups.length > 0 && (
                <div className="my-24">
                  <h2 className="text-3xl font-bold text-primary mb-6">Per Chi Lavoro</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {author.targetGroups.map((group, index) => (
                      <div key={index} className="bg-secondary/30 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-primary mb-3">{group.name}</h3>
                        {group.targetingMethod && (
                          <p className="text-foreground/70">
                            {group.targetingMethod}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-primary/10 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary mb-4">La Promessa</h2>
                <div
                  className="text-lg text-foreground/70 prose prose-primary max-w-none"
                  dangerouslySetInnerHTML={{ __html: promiseHtml }}
                />
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">Pronto a Iniziare il Tuo Reset?</h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Scopri come posso aiutarti a raggiungere il tuo benessere fisico duraturo.
            </p>
            <a
              href={author.bookingLink || "#"}
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
