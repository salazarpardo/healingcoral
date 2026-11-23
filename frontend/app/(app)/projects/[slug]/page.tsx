import Link from 'next/link'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/live'
import {getProjectQuery, homePageQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'
import NewsletterSection from '@/app/components/home/NewsletterSection'
import type {HomePageData} from '@/app/components/home/types'

export const dynamic = 'force-dynamic'

export default async function ProjectPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const [
    {data: project},
    {data: homeData},
  ] = await Promise.all([
    sanityFetch({query: getProjectQuery, params: {slug}}),
    sanityFetch({query: homePageQuery}),
  ])

  const p = project as {
    _id?: string
    title?: string
    slug?: string
    description?: string
    image?: {asset?: {_ref: string}}
  } | null

  if (!p?._id) notFound()

  return (
    <article className="min-h-screen">
      {/* Hero: full-width background with overlay text */}
      <section className="relative min-h-[50vh] flex items-end bg-teal-deep overflow-hidden">
        {p.image?.asset && (
          <Image
            src={urlForImage(p.image).width(1920).height(1080).fit('crop').url()}
            alt=""
            fill
            className="object-cover opacity-70"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/90 via-teal-deep/50 to-transparent" />
        <div className="container relative z-10 px-4 sm:px-6 pb-16 pt-32">
          <div className="max-w-4xl mx-auto">
            <p className="text-white uppercase text-sm tracking-[0.2em] mb-3">
              Our Work
            </p>
            <h1 className="text-4xl text-white sm:text-5xl lg:text-6xl font-bold leading-tight">
              {p.title}
            </h1>
            {p.description && (
              <p className="mt-4 text-white/95 text-lg max-w-2xl line-clamp-3">
                {p.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main content: centered column, white background */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-navy/80 hover:text-navy mb-8 text-sm font-medium"
            >
              ← Back to projects
            </Link>
            {p.description && (
              <div className="prose prose-lg text-navy/90 max-w-none prose-headings:text-navy prose-headings:font-bold">
                <p className="whitespace-pre-wrap leading-relaxed">{p.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <NewsletterSection data={(homeData ?? null) as HomePageData} />
    </article>
  )
}
