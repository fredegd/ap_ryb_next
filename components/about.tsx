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
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="font-onest">{children}</p>,
  },
}

export function About({ name, slogan, bio }: AboutProps) {
  return (
    <section id="about" className="bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-5xl font-passion-one font-normal text-primary mb-8 text-center uppercase tracking-wide">{name}</h1>
        {slogan && (
          <h2 className="text-3xl font-cormorant-garamond font-semibold text-foreground/80 mb-12 text-center italic">{slogan}</h2>
        )}

        <div className="space-y-6 text-foreground/80 leading-relaxed text-lg font-onest">
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
