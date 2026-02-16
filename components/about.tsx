"use client"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document, BLOCKS } from "@contentful/rich-text-types"

interface AboutProps {
  name: string
  slogan?: string
  bio?: Document
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: () => null,
    [BLOCKS.HEADING_2]: () => null,
    [BLOCKS.HEADING_3]: () => null,
    [BLOCKS.HEADING_4]: () => null,
    [BLOCKS.HEADING_5]: () => null,
    [BLOCKS.HEADING_6]: () => null,
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="font-cormorant-garamond">{children}</p>,
  },
}

export function About({ name, slogan, bio }: AboutProps) {
  return (
    <section id="about" className="bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-4xl font-passionone font-bold text-primary mb-12 text-center uppercase">{name}</h2>
        {slogan && (
          <h3 className="text-2xl font-passionone font-bold text-foreground mb-8 text-center uppercase">{slogan}</h3>
        )}

        <div className="space-y-8 text-foreground/80 leading-relaxed text-lg font-cormorant-garamond">
          {bio ? (
            documentToReactComponents(bio, richTextOptions)
          ) : (
            <p>Bio content not available.</p>
          )}
        </div>
      </div>
    </section>
  )
}
