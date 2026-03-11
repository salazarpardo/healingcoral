'use client' //

import {useState, useEffect, ReactNode} from 'react'

export default function StickyWrapper({children}: {children: ReactNode}) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) //
  }, [])

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        isScrolled ? 'bg-teal/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      {children}
    </div>
  )
}
