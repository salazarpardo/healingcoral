import Link from 'next/link'
import Image from 'next/image'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {linkResolver} from '@/sanity/lib/utils'
import {urlForImage} from '@/sanity/lib/utils'
import type {DereferencedLink} from '@/sanity/lib/types'
import StickyWrapper from './StickyWrapper'
import NavLinks from './NavLinks'
import MobileNav from './MobileNav'

function HeaderCtaButton({button}: {button?: {buttonText?: string; link?: DereferencedLink}}) {
  if (!button?.buttonText) return null
  const href = button.link ? linkResolver(button.link as DereferencedLink) : null
  if (!href)
    return (
      <span className="rounded-full bg-accent px-5 py-2.5 text-white font-bold text-sm tracking-wide opacity-90">
        {button.buttonText}
      </span>
    )
  return (
    <Link
      href={href}
      className="rounded-full bg-accent hover:bg-accent-hover px-5 py-2.5 text-white font-bold text-sm tracking-wide transition-colors"
    >
      {button.buttonText}
    </Link>
  )
}

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  const mainNav =
    (settings as {mainNav?: Array<{label?: string; link?: DereferencedLink}>})?.mainNav ?? []
  const headerCta = (settings as {headerCta?: {buttonText?: string; link?: DereferencedLink}})
    ?.headerCta
  const logo = (settings as {logo?: {asset?: {_ref: string}; alt?: string}})?.logo
  const title = (settings as {title?: string})?.title ?? 'Healing Coral'

  return (
    <StickyWrapper>
      <header className="top-0 py-6 max-w-6xl mx-auto">
        <div className="container flex items-center justify-between h-20 px-4 sm:px-6 sm:py-6">
          <Link href="/" className="flex items-center gap-2">
            {logo?.asset ? (
              <div className="relative w-20 h-16">
                <Image
                  src={urlForImage(logo).width(180).height(160).url()}
                  alt={(logo as {alt?: string}).alt || title}
                  fill
                  className="object-contain object-left"
                />
              </div>
            ) : (
              <span className="text-white font-semibold text-lg">{title}</span>
            )}
          </Link>

          <nav className="hidden sm:block">
            <ul className="flex items-center gap-6 md:gap-8">
              <NavLinks
                items={mainNav.map((item) => ({
                  label: item.label || '',
                  href: item.link ? linkResolver(item.link) : null,
                }))}
              />
              <li>
                <HeaderCtaButton button={headerCta} />
              </li>
            </ul>
          </nav>

          <MobileNav
            navItems={mainNav.map((item) => ({
              label: item.label || '',
              href: item.link ? linkResolver(item.link) : null,
            }))}
            ctaLabel={headerCta?.buttonText ?? null}
            ctaHref={headerCta?.link ? linkResolver(headerCta.link as DereferencedLink) : null}
            logoUrl={logo?.asset ? urlForImage(logo).width(180).height(160).url() : null}
            logoAlt={(logo as {alt?: string})?.alt || title}
          />
        </div>
      </header>
    </StickyWrapper>
  )
}
