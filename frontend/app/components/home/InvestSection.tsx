import Link from 'next/link'
import {PortableText} from '@portabletext/react'
import {linkResolver} from '@/sanity/lib/utils'
import type {HomePageData} from './types'

export default function InvestSection({data}: {data: HomePageData}) {
  if (!data?.investHeadline) return null

  const readMoreHref = data.investReadMoreLink ? linkResolver(data.investReadMoreLink) : null

  return (
    <section className="bg-section py-16 md:py-20">
      <div className="container px-4 sm:px-6 max-w-3xl lg:max-w-5xl">
        {data.investPreTitle && (
          <p className="text-navy-light uppercase text-sm tracking-[0.2em] mb-3">
            {data.investPreTitle}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">{data.investHeadline}</h2>
        {Array.isArray(data.investBody) && data.investBody.length > 0 ? (
          <div className="prose prose-lg max-w-none text-navy/90 mb-8 [&_p]:text-navy/90">
            <PortableText value={data.investBody} />
          </div>
        ) : null}
        {readMoreHref && (
          <Link
            href={readMoreHref}
            className="inline-flex items-center gap-2 text-navy font-semibold hover:underline"
          >
            READ MORE
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  )
}
