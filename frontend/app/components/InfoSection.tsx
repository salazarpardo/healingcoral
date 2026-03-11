import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import {InfoSection} from '@/sanity.types'

type InfoProps = {
  block: InfoSection
  index: number
  // Needed if you want to createDataAttributes to do non-text overlays in Presentation (Visual Editing)
  pageId: string
  pageType: string
}

export default function CTA({block}: InfoProps) {
  return (
    <section className="bg-section py-12 md:py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-left">
          {block?.heading && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy">
              {block.heading}
            </h2>
          )}
          {block?.subheading && (
            <span className="block mt-4 mb-8 text-lg uppercase font-light text-navy/70">
              {block.subheading}
            </span>
          )}
          <div className="mt-4 prose prose-lg text-navy/90 max-w-none">
            {block?.content?.length && (
              <PortableText className="" value={block.content as PortableTextBlock[]} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
