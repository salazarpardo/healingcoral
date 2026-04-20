'use client'

import {useState, useCallback, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'

type NavItem = {label: string; href: string | null}

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

type Props = {
  navItems: NavItem[]
  ctaLabel: string | null
  ctaHref: string | null
  logoUrl: string | null
  logoAlt: string
}

export default function MobileNav({navItems, ctaLabel, ctaHref, logoUrl, logoAlt}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const close = useCallback(() => setIsOpen(false), [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => close()

  return (
    <>
      {/* Hamburger button – visible only on mobile */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="nav:hidden flex flex-col justify-center w-10 h-10 text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open menu</span>
        <span className="block w-6 h-0.5 bg-current rounded-full mb-1.5" />
        <span className="block w-6 h-0.5 bg-current rounded-full mb-1.5" />
        <span className="block w-6 h-0.5 bg-current rounded-full" />
      </button>

      {/* Overlay */}
      <div
        className="nav:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={close}
        aria-hidden={!isOpen}
      />

      {/* Drawer panel – slides in from right */}
      <div
        className="nav:hidden fixed top-0 right-0 z-50 h-full w-[min(85vw,320px)] bg-white shadow-xl flex flex-col transition-transform duration-300 ease-out"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
        aria-modal="true"
        aria-label="Navigation menu"
        role="dialog"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/" onClick={handleLinkClick} className="flex items-center gap-2">
            {logoUrl ? (
              <div className="relative w-16 h-12">
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  fill
                  className="object-contain object-left"
                />
              </div>
            ) : (
              <span className="text-navy font-semibold text-lg">{logoAlt}</span>
            )}
          </Link>
          <button
            type="button"
            onClick={close}
            className="p-2 text-teal hover:bg-teal/10 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              if (!item.href) {
                return (
                  <li key={item.label}>
                    <span className="block py-3 px-3 text-navy/70 font-semibold text-base">
                      {item.label}
                    </span>
                  </li>
                )
              }
              const active = isActive(pathname, item.href)
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`block py-3 px-3 rounded-lg text-base font-semibold transition-colors ${
                      active
                        ? 'text-accent bg-accent/10'
                        : 'text-navy hover:bg-gray-100'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {ctaLabel && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              {ctaHref ? (
                <Link
                  href={ctaHref}
                  onClick={handleLinkClick}
                  className="block w-full text-center rounded-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 px-6 text-sm tracking-wide transition-colors"
                >
                  {ctaLabel}
                </Link>
              ) : (
                <span className="block w-full text-center rounded-full bg-accent/90 text-white font-bold py-3.5 px-6 text-sm tracking-wide">
                  {ctaLabel}
                </span>
              )}
            </div>
          )}

          {/* Language selector – optional */}
          <div className="mt-8 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-2 py-2 px-3 text-navy font-semibold text-sm">
              <span className="opacity-100">EN</span>
              <span className="text-gray-300">|</span>
              <span className="opacity-70">ES</span>
            </span>
          </div>
        </nav>
      </div>
    </>
  )
}
