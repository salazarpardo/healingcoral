import type {Metadata, ResolvingMetadata} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'

import Avatar from '@/app/components/Avatar'
import PortableText from '@/app/components/PortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
import {urlForImage, resolveOpenGraphImage} from '@/sanity/lib/utils'
import NewsletterSection from '@/app/components/home/NewsletterSection'
import {homePageQuery} from '@/sanity/lib/queries'
import type {HomePageData} from '@/app/components/home/types'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: postPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data ?? []
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: post} = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.coverImage)

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{name: `${post.author.firstName} ${post.author.lastName}`}]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function PostPage(props: Props) {
  const params = await props.params
  const [
    {data: post},
    {data: homeData},
  ] = await Promise.all([
    sanityFetch({query: postQuery, params}),
    sanityFetch({query: homePageQuery}),
  ])

  if (!post?._id) return notFound()

  return (
    <>
      <article className="min-h-screen">
        {/* Hero: full-width cover image with overlay text */}
        <section className="relative min-h-[55vh] flex items-end bg-teal-deep overflow-hidden">
          {post.coverImage?.asset && (
            <Image
              src={urlForImage(post.coverImage).width(1920).height(1080).fit('crop').url()}
              alt={(post.coverImage as {alt?: string}).alt || post.title || ''}
              fill
              className="object-cover opacity-70"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/90 via-teal-deep/50 to-transparent" />
          <div className="container relative z-10 px-4 sm:px-6 pb-16 pt-32">
            <div className="max-w-4xl mx-auto">
              <p className="text-white uppercase text-sm tracking-[0.2em] mb-3">
                Coral News
              </p>
              <h1 className="text-4xl text-white sm:text-5xl lg:text-6xl font-bold leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-4 text-white/95 text-lg max-w-2xl">
                  {post.excerpt}
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
                href="/posts"
                className="inline-flex items-center gap-2 text-navy/80 hover:text-navy mb-8 text-sm font-medium"
              >
                ← Back to news
              </Link>
              <div className="pb-6 mb-8 border-b border-gray-200">
                {post.author && (post.author.firstName || post.author.lastName) && (
                  <Avatar person={post.author} date={post.date} />
                )}
              </div>
              {post.content?.length ? (
                <div className="prose prose-lg text-navy/90 max-w-none prose-headings:text-navy prose-headings:font-bold prose-a:text-navy">
                  <PortableText
                    value={post.content as PortableTextBlock[]}
                    className="prose-headings:font-medium prose-headings:tracking-tight"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </article>

      <NewsletterSection data={(homeData ?? null) as HomePageData} />
    </>
  )
}
