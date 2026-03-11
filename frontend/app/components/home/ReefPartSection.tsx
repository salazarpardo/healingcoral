import Link from 'next/link'
import Image from 'next/image'
import {linkResolver, urlForImage} from '@/sanity/lib/utils'
import type {HomePageData} from './types'

export default function ReefPartSection({data}: {data: HomePageData}) {
  if (!data?.reefPartCards?.length) return null

  return (
    <section className="bg-section py-16 md:py-20">
      <div className="container px-4 sm:px-6">
        {data.reefPartTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12">{data.reefPartTitle}</h2>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {data.reefPartCards.map((card) => {
            const href = card.button?.link ? (linkResolver(card.button.link) ?? '#') : '#'
            return (
              <article key={card._key} className="group overflow-hidden flex flex-col">
                {card.image?.asset && (
                  <Link
                    href={href}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4"
                  >
                    <Image
                      src={urlForImage(card.image).width(600).height(450).fit('crop').url()}
                      alt={card.title || ''}
                      fill
                      sizes="(max-width: 600px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-navy mb-3">{card.title}</h3>
                  {card.description && (
                    <p className="text-navy/80 text-sm flex-1 mb-6">{card.description}</p>
                  )}
                  {card.button?.buttonText && (
                    <Link
                      href={href}
                      className="inline-flex justify-center rounded-full border border-navy text-navy font-bold py-2.5 px-4 text-sm tracking-wide hover:bg-navy hover:text-white transition-colors w-fit"
                    >
                      {card.button.buttonText}
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
