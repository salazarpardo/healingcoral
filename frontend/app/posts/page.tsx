import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {postsPaginatedQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'
import Pagination, {PAGE_SIZE} from '@/app/components/Pagination'
import NewsletterSection from '@/app/components/home/NewsletterSection'
import {sanityFetch as fetchHome} from '@/sanity/lib/live'
import {homePageQuery} from '@/sanity/lib/queries'

type PostItem = {
  _id: string
  title?: string
  slug?: string
  excerpt?: string
  coverImage?: {asset?: {_ref: string}}
  date?: string
}

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Coral News',
  description:
    'Stay updated on the latest news and events from Healing Coral. Non-profit initiatives for marine ecosystem regeneration in the Caribbean.',
}

export default async function NewsListingPage({
  searchParams,
}: {
  searchParams: Promise<{page?: string}>
}) {
  const {page: pageParam} = await searchParams
  const currentPage = Math.max(1, parseInt(String(pageParam || '1'), 10))
  const offset = (currentPage - 1) * PAGE_SIZE

  const {data} = await sanityFetch({
    query: postsPaginatedQuery,
    params: {offset, limit: PAGE_SIZE},
  })

  const {data: homeData} = await fetchHome({query: homePageQuery})

  const total = (data as {total?: number})?.total ?? 0
  const posts = (data as {posts?: PostItem[]})?.posts ?? []

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center bg-teal/50 bg-[url(/images/beach-1280.jpg)] bg-cover bg-center pt-40 pb-16 overflow-hidden">
       
        <div className="container relative z-10 px-4 sm:px-6 max-w-4xl py-16">
          <p className="text-white uppercase text-sm tracking-[0.2em] mb-3">Coral News</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
            Stay updated on our latest news and events
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mb-8">
            We are a non-profit organization that simplifies funding of local initiatives for the
            regeneration of marine ecosystems in the wider Caribbean.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-white py-16 md:py-20">
        <div className="container px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={post.slug ? `/posts/${post.slug}` : '#'}
                className="group overflow-hidden  flex flex-col"
              >
                {post.coverImage?.asset && (
                  <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={urlForImage(post.coverImage).width(600).height(450).fit('crop').url()}
                      alt={post.title || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-navy mb-3 group-hover:text-teal-dark transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-navy/80 text-sm flex-1 line-clamp-3 mb-4">{post.excerpt}</p>
                  )}
                  <span className="text-navy font-semibold text-sm inline-flex items-center gap-1">
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

          <Pagination
            basePath="/posts"
            currentPage={currentPage}
            totalItems={total}
            pageSize={PAGE_SIZE}
          />
        </div>
      </section>

      <NewsletterSection data={homeData ?? null} />
    </>
  )
}
