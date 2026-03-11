import Link from 'next/link'
import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'
import type {HomePageData} from './types'

export default function NewsSection({data}: {data: HomePageData}) {
  const items = (data?.newsItems?.length ? data.newsItems : data?.latestPosts) ?? []
  if (!items.length) return null

  return (
    <section className="relative bg-white pb-16 md:pb-20">
      {/* Wavy transition to white */}
      <div className="top-0 left-0 right-0">
        <Image
          src="/images/bgmap-1.svg"
          unoptimized
          width={1440}
          height={250}
          alt="Background map"
          className="w-full object-contain"
        />
      </div>

      <div className="container px-4 sm:px-6">
        {data?.newsTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12">{data.newsTitle}</h2>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {items.slice(0, 3).map((item) => (
            <Link
              key={item._id}
              href={item.slug ? `/posts/${item.slug}` : '#'}
              className="group overflow-hidden flex flex-col"
            >
              {item.coverImage?.asset && (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={urlForImage(item.coverImage).width(600).height(450).fit('crop').url()}
                    alt={item.title || ''}
                    fill
                    sizes="(max-width: 600px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-teal-dark transition-colors line-clamp-2">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-navy/80 text-sm flex-1 line-clamp-2 mb-4">{item.excerpt}</p>
                )}
                <span className="text-navy font-bold text-sm inline-flex items-center gap-1">
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
