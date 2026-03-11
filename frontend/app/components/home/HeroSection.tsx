import Link from 'next/link'
import Image from 'next/image'
import {linkResolver, urlForImage} from '@/sanity/lib/utils'
import type {HomePageData} from './types'

export default function HeroSection({data}: {data: HomePageData}) {
  if (!data?.heroHeadline) return null

  const bgImage = data.heroBackgroundImage
  const videoUrl = data.heroBackgroundVideoUrl
  const cta = data.heroCta
  const ctaHref = cta?.link ? (linkResolver(cta.link) ?? '#') : '#'

  const imageUrl = bgImage?.asset
    ? urlForImage(bgImage).width(1920).height(1080).fit('crop').url()
    : null

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background: video with image fallback/poster */}
      <div className="absolute inset-0 bg-teal/70">
        {videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={imageUrl ?? undefined}
            className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
            aria-hidden
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
          </video>
        ) : (
          imageUrl && (
            <Image src={imageUrl} alt="" fill className="object-cover opacity-50" priority />
          )
        )}
        <div className="absolute inset-0 bg-linear-(--hero-gradient) bg-blend-luminosity bg-no-repeat bg-cover" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 max-w-3xl lg:max-w-4xl pt-32 pb-24">
        {data.heroPreTitle && (
          <p className="text-white uppercase text-sm tracking-[0.1em] max-w-4xl mx-auto mb-4">{data.heroPreTitle}</p>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
          {data.heroHeadline}
        </h1>
        {data.heroDescription && (
          <p className="text-white/95 text-lg md:text-xl max-w-4xl mb-10 mx-auto">{data.heroDescription}</p>
        )}
        {cta?.buttonText && (
          <Link
            href={ctaHref}
            className="inline-block rounded-full bg-accent/96 hover:bg-accent-hover px-8 py-4 text-white font-bold text-lg tracking-wide transition-colors"
          >
            {cta.buttonText}
          </Link>
        )}
      </div>
    </section>
  )
}
