'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

type NavItem = {label: string; href: string | null}

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function NavLinks({items}: {items: NavItem[]}) {
  const pathname = usePathname()

  return (
    <>
      {items.map((item) => {
        if (!item.href) {
          return (
            <li key={item.label}>
              <span className="text-white/80 text-sm tracking-wide">{item.label}</span>
            </li>
          )
        }
        const active = isActive(pathname, item.href)
        return (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`text-sm tracking-wide transition-opacity ${
                active
                  ? 'text-white font-semibold opacity-100'
                  : 'text-white hover:opacity-90 opacity-90'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </>
  )
}
