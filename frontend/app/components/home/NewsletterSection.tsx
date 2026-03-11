'use client'

import {useState} from 'react'
import Image from 'next/image'
import type {HomePageData} from './types'

export default function NewsletterSection({data}: {data: HomePageData}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    // TODO: wire to your newsletter API (e.g. Mailchimp, Resend)
    await new Promise((r) => setTimeout(r, 500))
    setStatus('success')
    setEmail('')
  }

  if (!data?.newsletterTitle) return null

  return (
    <section className="relative bg-gray-50 pt-16 md:pt-20 pb-0">
      <div className="container px-4 sm:px-6 max-w-2xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          {data.newsletterTitle}
        </h2>
        {data.newsletterDescription && (
          <p className="text-navy/80 mb-8">{data.newsletterDescription}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="flex-1 bg-gray-100 rounded-full border border-gray-200 px-4 py-3 text-navy placeholder:text-gray-400 focus:border-teal focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full border border-navy text-navy font-bold py-2.5 px-8 text-sm tracking-wide hover:bg-navy hover:text-white transition-colors disabled:opacity-70"
          >
            {status === 'loading' ? '…' : 'Subscribe'}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-4 text-teal font-medium">Thanks! Check your inbox to confirm.</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600">Something went wrong. Please try again.</p>
        )}
      </div>
      <div className="bottom-0 left-0 right-0 z-0">
        <Image src="/images/bgmap-2.svg" unoptimized width={1440} height={250} alt="Background map" className="w-full object-contain" />
      </div>
    </section>
  )
}
