import Link from 'next/link'
import Image from 'next/image'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {linkResolver, urlForImage} from '@/sanity/lib/utils'
import type {DereferencedLink} from '@/sanity/lib/types'

const SOCIAL_ICONS: Record<string, {path: string; label: string}> = {
  instagram: {
    path: 'M16 10a6 6 0 1 0 6 6 6.006 6.006 0 0 0-6-6m0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6-17H10a7.007 7.007 0 0 0-7 7v12a7.01 7.01 0 0 0 7 7h12a7.01 7.01 0 0 0 7-7V10a7.01 7.01 0 0 0-7-7m5 19a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V10a5 5 0 0 1 5-5h12a5 5 0 0 1 5 5zM24 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0',
    label: 'Instagram',
  },
  twitter: {
    path: 'm26.844 26.464-7.825-12.298 7.721-8.494a1 1 0 0 0-1.48-1.344l-7.355 8.09-5.061-7.954A1 1 0 0 0 12 4H6a1 1 0 0 0-.844 1.537l7.825 12.297-7.721 8.5a1 1 0 1 0 1.48 1.345l7.355-8.09 5.061 7.954A1 1 0 0 0 20 28h6a1 1 0 0 0 .844-1.536M20.549 26 7.82 6h3.625L24.18 26z',
    label: 'X (Twitter)',
  },
  facebook: {
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    label: 'Facebook',
  },
  linkedin: {
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    label: 'LinkedIn',
  },
  youtube: {
    path: 'm20.555 15.168-6-4A1 1 0 0 0 13 12v8a1 1 0 0 0 1.555.832l6-4a1 1 0 0 0 0-1.665M15 18.13v-4.256L18.198 16zM29.291 8.69a3 3 0 0 0-1.811-2.05C23.195 4.985 16.375 5 16 5S8.805 4.985 4.52 6.64a3 3 0 0 0-1.811 2.05C2.385 9.938 2 12.218 2 16s.385 6.063.709 7.31a3 3 0 0 0 1.811 2.051C8.625 26.945 15.05 27 15.918 27h.165c.867 0 7.296-.055 11.397-1.639a3 3 0 0 0 1.811-2.051c.324-1.25.709-3.527.709-7.31s-.385-6.062-.709-7.31m-1.936 14.125a1 1 0 0 1-.596.686c-3.957 1.528-10.685 1.5-10.75 1.5H16c-.068 0-6.791.025-10.75-1.5a1 1 0 0 1-.596-.686C4.35 21.674 4 19.571 4 16s.35-5.674.645-6.809a1 1 0 0 1 .596-.691C9.056 7.026 15.45 7 15.973 7h.033c.068 0 6.798-.022 10.75 1.5a1 1 0 0 1 .596.686C27.65 10.326 28 12.43 28 16s-.35 5.674-.645 6.809z',
    label: 'Youtube',
  },
  opensea: {
    path: 'M22.268 28.5V30H8.737v-1.5zM8.756 12.096c0-1.372-.28-2.66-.79-3.818l-4.755 8.27h4.425a9.5 9.5 0 0 0 1.12-4.452M6.98 22.523c0 .667.522 1.19 1.186 1.19h4.843v-2.809H9.686a14.23 14.23 0 0 0 3.025-8.187l.014-.621a14.15 14.15 0 0 0-3.75-9.62 20.4 20.4 0 0 1 3.987.81v-.81c0-.809.665-1.476 1.472-1.476s1.472.667 1.472 1.477V4.38c4.51 2.095 7.5 5.619 7.5 9.619 0 2.333-.996 4.524-2.752 6.333l-.132.118a1.84 1.84 0 0 1-.973.398l-.177.008v-1.5c.09 0 .174-.041.215-.08 1.524-1.575 2.32-3.4 2.32-5.277 0-3.187-2.406-6.295-6.633-8.259l-.868-.403V5.3l-1.886-.582-.155-.046a15.65 15.65 0 0 1 1.86 7.423 15.7 15.7 0 0 1-1.796 7.308h2.024v-.047h4.919v1.5h-3.418v2.81h4.272c.79 0 2.16-1.35 3.031-2.389l.34-.42s.048-.049.143-.096c.11-.051 7.87-1.807 7.88-1.81.143-.048.332.096.333.238L32 20.857l-.008.07a.26.26 0 0 1-.134.169l-.588.28c-.75.377-1.88 1.029-2.45 1.814l-.352.508c-1.675 2.531-3.077 6.058-5.903 6.29l-.297.012v-1.5c.862 0 1.634-.527 2.56-1.803.45-.621.872-1.33 1.33-2.102.442-.746.923-1.564 1.447-2.285.333-.46.765-.853 1.195-1.18l-.75.172a959 959 0 0 0-2.7.619l-.842.195c-.427.52-.979 1.128-1.552 1.649-.352.32-.747.639-1.15.887-.36.221-.928.515-1.58.515h-5.717v.047H8.166a2.677 2.677 0 0 1-2.686-2.69v-.12H1.592c.55 3.556 3.57 6.096 7.145 6.096V30l-.448-.01C3.696 29.76-.046 26.031 0 21.142c0-.125.074-.214.187-.234l.052-.005H6.6c.237 0 .38.192.38.382zm3.268-10.02a11.1 11.1 0 0 1-1.55 5.22l-.199.325H.618L7.929 5.333c1.472 1.857 2.327 4.191 2.327 6.763z',
    label: 'Opensea',
  },
  discord: {
    path: 'M13 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m7.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m9.306 8.113-8.375 3.713a2.023 2.023 0 0 1-2.713-1.137l-1.014-2.75a26 26 0 0 1-1.704.057q-.864.002-1.704-.057l-1.013 2.75a2.02 2.02 0 0 1-2.714 1.137l-8.375-3.713a1.99 1.99 0 0 1-1.133-2.314L4.75 7.25a2.01 2.01 0 0 1 1.625-1.482l4.508-.742a2.03 2.03 0 0 1 2.282 1.485l.408 1.605A25 25 0 0 1 16 8q1.237 0 2.425.116l.407-1.605a2.026 2.026 0 0 1 2.283-1.485l4.51.742A2.01 2.01 0 0 1 27.25 7.25l3.691 14.548a1.99 1.99 0 0 1-1.135 2.315M29 22.285 25.309 7.75h-.01L20.79 7a.02.02 0 0 0-.021 0l-.354 1.393c.625.117 1.25.257 1.854.427A1 1 0 0 1 22 10.79q-.137 0-.27-.038a21.5 21.5 0 0 0-5.73-.75 21.5 21.5 0 0 0-5.73.75.998.998 0 0 1-1.287-1.082 1 1 0 0 1 .747-.844c.602-.17 1.223-.31 1.852-.427L11.23 7h-.015L6.7 7.741H6.69L3 22.291l8.375 3.71a.03.03 0 0 0 .027 0l.848-2.286q-1.276-.195-2.517-.54a1 1 0 0 1 .537-1.925c1.867.507 3.795.76 5.73.75 1.935.01 3.863-.243 5.73-.75a1 1 0 0 1 .54 1.926q-1.244.345-2.52.54L20.594 26a.03.03 0 0 0 .026 0z',
    label: 'Discord',
  },
}

function ColumnLinks({
  title,
  links,
}: {
  title?: string
  links?: Array<{label?: string; link?: DereferencedLink}>
}) {
  if (!links?.length) return null
  return (
    <div>
      {title && (
        <p className="text-teal-dark font-bold text-xs uppercase tracking-wide mb-4">{title}</p>
      )}
      <ul className="space-y-2">
        {links.map((item) => {
          const href = item.link ? linkResolver(item.link) : null
          if (!href) return null
          return (
            <li key={item.label}>
              <Link
                href={href}
                className="text-white/90 text-sm tracking-wide hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default async function Footer() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  const s = settings as {
    title?: string
    logo?: {asset?: {_ref: string}; alt?: string}
    footerColumns?: Array<{
      title?: string
      links?: Array<{label?: string; link?: DereferencedLink}>
    }>
    socialLinks?: Array<{platform?: string; url?: string}>
    partnerLogos?: Array<{logo?: {asset?: {_ref: string}}; name?: string; url?: string}>
    copyright?: string
  }

  const footerColumns = s?.footerColumns ?? []
  const socialLinks = s?.socialLinks ?? []
  const partnerLogos = s?.partnerLogos ?? []
  const copyright = s?.copyright ?? '© 2026 Healing Coral. All rights reserved.'
  const title = s?.title ?? 'Healing Coral'
  const logo = s?.logo

  return (
    <footer className="bg-teal text-white relative overflow-hidden">
      

      <div className="container pt-20 pb-8 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-12">
          <Link href="/" className="flex items-center gap-2">
            {logo?.asset ? (
              <div className="relative w-30 h-24 shrink-0">
                <Image
                  src={urlForImage(logo).width(98).height(88).url()}
                  alt={(logo as {alt?: string}).alt || title}
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            ) : (
              <span className="text-xl font-semibold">{title}</span>
            )}
          </Link>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 flex-1 max-w-3xl">
            {footerColumns.map((col) => (
              <ColumnLinks key={col.title} title={col.title} links={col.links} />
            ))}
          </div>
        </div>

        {partnerLogos.length > 0 && (
          <div className="py-4">
            <p className="text-teal-dark font-bold text-xs uppercase tracking-wide mb-4">Allies</p>
            <div className="flex flex-wrap items-center gap-8">
              {partnerLogos.map((partner) => (
                <a
                  key={partner.name || 'partner'}
                  href={partner.url || '#'}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                  target={partner.url ? '_blank' : undefined}
                  rel={partner.url ? 'noopener noreferrer' : undefined}
                >
                  {partner.logo?.asset ? (
                    <span className="relative inline-block w-30 h-auto grayscale brightness-0 invert">
                      <Image
                        src={urlForImage(partner.logo).width(248).height(176).fit('max').url()}
                        alt={partner.name || 'Partner'}
                        width={124}
                        height={88}
                        className="object-contain object-left"
                      />
                    </span>
                  ) : (
                    <span className="text-sm text-white/70">{partner.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {socialLinks.length > 0 && (
          <div className="py-8">
            <p className="text-teal-dark font-bold text-xs uppercase tracking-wide mb-4">
              Follow us
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const platform = social.platform || ''
                const icon = SOCIAL_ICONS[platform]
                if (!icon || !social.url) return null
                return (
                  <a
                    key={platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-dark hover:text-teal-dark transition-colors p-1"
                    aria-label={icon.label}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
                      <path d={icon.path} />
                    </svg>
                  </a>
                )
              })}
            </div>
          </div>
        )}

        <p className="text-teal-dark  text-xs pt-6">{copyright}</p>
      </div>
    </footer>
  )
}
