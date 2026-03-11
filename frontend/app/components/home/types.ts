import type {DereferencedLink} from '@/sanity/lib/types'

export type HomePageData = {
  heroPreTitle?: string
  heroHeadline?: string
  heroDescription?: string
  heroCta?: {buttonText?: string; link?: DereferencedLink}
  heroBackgroundImage?: {asset?: {_ref: string}}
  heroBackgroundVideoUrl?: string | null
  investPreTitle?: string
  investHeadline?: string
  investBody?: unknown
  investReadMoreLink?: DereferencedLink
  reefPartTitle?: string
  reefPartCards?: Array<{
    _key: string
    image?: {asset?: {_ref: string}}
    title?: string
    description?: string
    button?: {buttonText?: string; link?: DereferencedLink}
  }>
  projectsTitle?: string
  projects?: Array<{
    _id: string
    title?: string
    slug?: string
    description?: string
    image?: {asset?: {_ref: string}}
  }>
  newsTitle?: string
  newsItems?: Array<{
    _id: string
    title?: string
    slug?: string
    excerpt?: string
    coverImage?: {asset?: {_ref: string}}
    date?: string
  }>
  latestPosts?: Array<{
    _id: string
    title?: string
    slug?: string
    excerpt?: string
    coverImage?: {asset?: {_ref: string}}
    date?: string
  }>
  newsletterTitle?: string
  newsletterDescription?: string
} | null
