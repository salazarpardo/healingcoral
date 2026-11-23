import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-24">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-teal-dark">404</p>
        <h1 className="mt-4 text-4xl font-bold text-navy sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-navy/80">
          We couldn’t find the page you were looking for. It may have moved, or it might not be
          published yet.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-accent/96 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover focus:bg-accent-hover"
          >
            Back to home
          </Link>
          <Link
            href="/collections"
            className="rounded-full border border-navy px-6 py-3 font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus:bg-navy focus:text-white"
          >
            Explore collections
          </Link>
        </div>
      </div>
    </section>
  )
}
