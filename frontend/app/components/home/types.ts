import type {DereferencedLink} from '@/sanity/lib/types'

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
    image?: {asset?: {_ref: string}}
    title?: string
    description?: string
    button?: {buttonText?: string; link?: DereferencedLink}
  }> | null
  projectsTitle?: string | null
  projects?: Array<{
    _id: string
    title?: string
    slug?: string
    description?: string
    image?: {asset?: {_ref: string}}
  }> | null
  newsTitle?: string | null
  newsItems?: Array<{
    _id: string
    title?: string
    slug?: string
    excerpt?: string
    coverImage?: {asset?: {_ref: string}}
    date?: string
  }> | null
  latestPosts?: Array<{
    _id: string
    title?: string
    slug?: string
    excerpt?: string
    coverImage?: {asset?: {_ref: string}}
    date?: string
  }> | null
  newsletterTitle?: string | null
  newsletterDescription?: string | null
} | null
