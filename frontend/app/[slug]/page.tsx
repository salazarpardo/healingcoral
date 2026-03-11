import type {Metadata} from 'next'
import Head from 'next/head'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery, homePageQuery, pagesSlugs} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'
import {PageOnboarding} from '@/app/components/Onboarding'
import NewsletterSection from '@/app/components/home/NewsletterSection'
import type {HomePageData} from '@/app/components/home/types'

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  const [
    {data: page},
    {data: homeData},
  ] = await Promise.all([
    sanityFetch({query: getPageQuery, params}),
    sanityFetch({query: homePageQuery}),
  ])

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    )
  }

  return (
    <div className={`page-content page-${page.name.toLowerCase().replace(/ /g, '-')}`}>
      <Head>
        <title>{page.heading}</title>
      </Head>
      <div className="page-heading bg-teal/50 bg-[url(/images/beach-1280.jpg)] bg-cover bg-center pt-40 pb-16">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-base text-white uppercase font-light tracking-[0.1em] mb-4">
              {page.name}
            </p>
            <h1 className="text-4xl text-white sm:text-5xl lg:text-7xl font-bold">
              {page.heading}
            </h1>
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-white font-light mb-8">
              {page.subheading}
            </p>
          </div>
        </div>
      </div>
      <PageBuilderPage page={page as GetPageQueryResult} />
      <NewsletterSection data={(homeData ?? null) as HomePageData} />
    </div>
  )
}
