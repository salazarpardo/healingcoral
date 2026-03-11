import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {collectionsPageQuery, homePageQuery} from '@/sanity/lib/queries'
import {urlForImage, linkResolver} from '@/sanity/lib/utils'
import NewsletterSection from '@/app/components/home/NewsletterSection'
import type {HomePageData} from '@/app/components/home/types'

type Creator = {
  _id: string
  firstName?: string
  lastName?: string
  location?: string
  bio?: string
  picture?: {asset?: {_ref: string}; alt?: string}
}

type CollectionItem = {
  _id: string
  title?: string
  slug?: string
  description?: string
  images?: Array<{asset?: {_ref: string}}>
  viewNftsUrl?: string
  readMoreLink?: {linkType?: string; href?: string; page?: string; post?: string}
  creator?: Creator
}

type CollectionsPageData = {
  heroPreTitle?: string
  heroTitle?: string
  heroDescription?: string
  heroCta?: {buttonText?: string; link?: {linkType?: string; href?: string; page?: string; post?: string}}
  heroBackgroundImage?: {asset?: {_ref: string}}
  introTitle?: string
  introBody?: string
  collections?: CollectionItem[]
}

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Our Collections',
  description:
    'Discover Healing Coral NFT collections. Nature-backed crypto assets for marine ecosystem regeneration in the Caribbean.',
}

export default async function CollectionsPage() {
  const [{data: pageData}, {data: homeData}] = await Promise.all([
    sanityFetch({query: collectionsPageQuery}),
    sanityFetch({query: homePageQuery}),
  ])

  const data = pageData as CollectionsPageData | null
  const collections = data?.collections ?? []

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-teal/50 bg-[url(/images/beach-1280.jpg)] bg-cover bg-center pt-40 pb-16 overflow-hidden">
        {data?.heroBackgroundImage?.asset && (
          <Image
            src={urlForImage(data.heroBackgroundImage).width(1920).height(1080).fit('crop').url()}
            alt=""
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="container relative z-10 px-4 sm:px-6 max-w-4xl py-16">
          {data?.heroPreTitle && (
            <p className="text-white uppercase text-sm tracking-[0.2em] mb-3">
              {data.heroPreTitle}
            </p>
          )}
          {data?.heroTitle && (
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
              {data.heroTitle}
            </h1>
          )}
          {data?.heroDescription && (
            <p className="text-white/95 text-lg max-w-2xl mb-8">{data.heroDescription}</p>
          )}
          {data?.heroCta?.buttonText && (
            <Link
              href={data.heroCta.link ? linkResolver(data.heroCta.link as any) ?? '#' : '#'}
              className="inline-block rounded-full bg-accent hover:bg-accent-hover px-8 py-4 text-white font-bold text-sm tracking-wide transition-colors"
            >
              {data.heroCta.buttonText}
            </Link>
          )}
        </div>
      </section>

      {/* Intro */}
      {(data?.introTitle || data?.introBody) && (
        <section className="bg-section py-16 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-left">
              {data.introTitle && (
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                  {data.introTitle}
                </h2>
              )}
              {data.introBody && (
                <p className="text-navy/90 text-lg leading-relaxed">{data.introBody}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Collections list */}
      <section className="bg-section py-12 md:py-16">
        <div className="container">
          {collections.map((collection) => {
            const creator = collection.creator
            const creatorName =
              creator &&
              [creator.firstName, creator.lastName].filter(Boolean).join(' ')
            const readMoreHref = collection.readMoreLink
              ? linkResolver(collection.readMoreLink as any)
              : null

            return (
              <article
                key={collection._id}
                className="flex flex-col lg:flex-row gap-12 lg:gap-16 py-12 md:py-16 border-b border-teal/20 last:border-b-0"
              >
                {/* Left: image grid + details */}
                <div className="flex-1 min-w-0">
                  {collection.images && collection.images.length >= 4 && (
                    <div className="grid grid-cols-2 gap-2 max-w-md mb-8">
                      {collection.images.slice(0, 4).map((img, i) => (
                        <div
                          key={i}
                          className="relative aspect-square rounded-lg overflow-hidden"
                        >
                          <Image
                            src={urlForImage(img).width(400).height(400).fit('crop').url()}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 50vw, 200px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                    {collection.title}
                  </h3>
                  {collection.description && (
                    <p className="text-navy/90 mb-6 max-w-xl">{collection.description}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-4">
                    {collection.viewNftsUrl && (
                      <Link
                        href={collection.viewNftsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full border-2 border-navy text-navy font-semibold py-2.5 px-6 text-sm hover:bg-navy hover:text-white transition-colors"
                      >
                        View NFTs
                      </Link>
                    )}
                    {readMoreHref && (
                      <Link
                        href={readMoreHref}
                        className="inline-flex items-center gap-1 text-navy font-semibold text-sm hover:underline"
                      >
                        Read more
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right: creator profile */}
                {creator && (
                  <div className="lg:w-80 flex-shrink-0">
                    <div className="creator-profile">
                      {creator.picture?.asset && (
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                          <Image
                            src={urlForImage(creator.picture).width(96).height(96).fit('crop').url()}
                            alt={(creator.picture as {alt?: string}).alt || creatorName || ''}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h4 className="text-lg font-bold text-navy">{creatorName}</h4>
                      {creator.location && (
                        <p className="text-navy-light text-sm font-medium mt-1 uppercase tracking-wide">
                          {creator.location}
                        </p>
                      )}
                      {creator.bio && (
                        <p className="text-navy/80 text-sm mt-3 line-clamp-4">{creator.bio}</p>
                      )}
                      {readMoreHref && (
                        <Link
                          href={readMoreHref}
                          className="inline-flex items-center gap-1 text-navy font-semibold text-sm mt-4 hover:underline"
                        >
                          Read more
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <NewsletterSection data={(homeData ?? null) as HomePageData} />
    </>
  )
}
