import Link from 'next/link'

const PAGE_SIZE = 9
const MAX_PAGES_SHOWN = 5

type Props = {
  basePath: string
  currentPage: number
  totalItems: number
  pageSize?: number
}

export function getTotalPages(totalItems: number, pageSize: number = PAGE_SIZE) {
  return Math.max(1, Math.ceil(totalItems / pageSize))
}

export default function Pagination({
  basePath,
  currentPage,
  totalItems,
  pageSize = PAGE_SIZE,
}: Props) {
  const totalPages = getTotalPages(totalItems, pageSize)
  if (totalPages <= 1) return null

  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(MAX_PAGES_SHOWN / 2), totalPages - MAX_PAGES_SHOWN + 1),
  )
  const endPage = Math.min(totalPages, startPage + MAX_PAGES_SHOWN - 1)

  return (
    <nav className="flex items-center justify-center gap-2 pt-12 pb-8" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="rounded-lg px-3 py-2 text-navy hover:bg-teal/10 transition-colors"
          aria-label="Previous page"
        >
          &lt;
        </Link>
      ) : (
        <span className="rounded-lg px-3 py-2 text-gray-400 cursor-not-allowed" aria-hidden>
          &lt;
        </span>
      )}

      <div className="flex items-center gap-1">
        {Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i).map((p) =>
          p === currentPage ? (
            <span
              key={p}
              className="rounded-lg bg-teal text-white px-3 py-2 font-semibold min-w-[2.5rem] text-center"
              aria-current="page"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={p === 1 ? basePath : `${basePath}?page=${p}`}
              className="rounded-lg px-3 py-2 text-navy hover:bg-teal/10 transition-colors min-w-[2.5rem] text-center"
            >
              {p}
            </Link>
          ),
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="rounded-lg px-3 py-2 text-navy hover:bg-teal/10 transition-colors"
          aria-label="Next page"
        >
          &gt;
        </Link>
      ) : (
        <span className="rounded-lg px-3 py-2 text-gray-400 cursor-not-allowed" aria-hidden>
          &gt;
        </span>
      )}
    </nav>
  )
}

export {PAGE_SIZE}
