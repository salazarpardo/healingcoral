import type {DereferencedLink} from '@/sanity/lib/types'

/** Sanity returns null for empty fields; image/asset shapes can include extra fields from GROQ */
type SanityImageLike = {asset?: {_ref?: string}; _type?: string; media?: unknown; hotspot?: unknown; crop?: unknown} | null

/** Optional string fields allow null (Sanity GROQ returns null for empty) */
export type HomePageData = {
  heroPreTitle?: string | null
  heroHeadline?: string | null
  heroDescription?: string | null
  heroCta?: {buttonText?: string | null; link?: DereferencedLink | null} | null
  heroBackgroundImage?: {asset?: {_ref: string}} | null
  heroBackgroundVideoUrl?: string | null
  investPreTitle?: string | null
  investHeadline?: string | null
  investBody?: unknown
  investReadMoreLink?: DereferencedLink | null
  reefPartTitle?: string | null
  reefPartCards?: Array<{
    _key: string
    image?: SanityImageLike
    title?: string | null
    description?: string | null
    button?: {buttonText?: string | null; link?: DereferencedLink | null} | null
  }> | null
  projectsTitle?: string | null
  projects?: Array<{
    _id: string
    title?: string | null
    slug?: string | null
    description?: string | null
    image?: SanityImageLike
  }> | null
  newsTitle?: string | null
  newsItems?: Array<{
    _id: string
    title?: string | null
    slug?: string | null
    excerpt?: string | null
    coverImage?: SanityImageLike
    date?: string | null
  }> | null
  latestPosts?: Array<{
    _id: string
    title?: string | null
    slug?: string | null
    excerpt?: string | null
    coverImage?: SanityImageLike
    date?: string | null
  }> | null
  newsletterTitle?: string | null
  newsletterDescription?: string | null
} | null
