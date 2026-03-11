import {defineQuery} from 'next-sanity'

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
    ...,
    ${linkReference}
  }
`

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    _id,
    title,
    description,
    ogImage,
    logo,
    mainNav[] {
      label,
      link { ..., ${linkReference} }
    },
    headerCta { buttonText, link { ..., ${linkReference} } },
    footerColumns[] {
      title,
      links[] { label, link { ..., ${linkReference} } }
    },
    socialLinks,
    partnerLogos[] { logo, name, url },
    copyright
  }
`)

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    _id,
    heroPreTitle,
    heroHeadline,
    heroDescription,
    heroCta { buttonText, link { ..., ${linkReference} } },
    heroBackgroundImage,
    "heroBackgroundVideoUrl": heroBackgroundVideo.asset->url,
    investPreTitle,
    investHeadline,
    investBody,
    investReadMoreLink { ..., ${linkReference} },
    reefPartTitle,
    reefPartCards[] {
      _key,
      image,
      title,
      description,
      button { buttonText, link { ..., ${linkReference} } }
    },
    projectsTitle,
    "projects": projects[]-> {
      _id,
      title,
      "slug": slug.current,
      description,
      image
    },
    newsTitle,
    "newsItems": newsItems[]-> {
      _id,
      "title": coalesce(title, "Untitled"),
      "slug": slug.current,
      excerpt,
      coverImage,
      "date": coalesce(date, _updatedAt)
    },
    "latestPosts": *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc)[0...3] {
      _id,
      "title": coalesce(title, "Untitled"),
      "slug": slug.current,
      excerpt,
      coverImage,
      "date": coalesce(date, _updatedAt)
    },
    newsletterTitle,
    newsletterDescription
  }
`)

export const collectionsPageQuery = defineQuery(`
  *[_type == "collectionsPage"][0] {
    _id,
    heroPreTitle,
    heroTitle,
    heroDescription,
    heroCta { buttonText, link { ..., ${linkReference} } },
    heroBackgroundImage,
    introTitle,
    introBody,
    "collections": collections[]-> {
      _id,
      title,
      "slug": slug.current,
      description,
      images,
      viewNftsUrl,
      readMoreLink { ..., ${linkReference} },
      "creator": creator-> {
        _id,
        firstName,
        lastName,
        location,
        bio,
        picture
      }
    }
  }
`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      _type == "teamSection" => {
        ...,
        "people": people[]-> {
          _id,
          firstName,
          lastName,
          role,
          bio,
          picture
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const getProjectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    image
  }
`)

export const projectSlugs = defineQuery(`
  *[_type == "project" && defined(slug.current)]
  {"slug": slug.current}
`)

const projectListFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  description,
  image
`

export const postsPaginatedQuery = defineQuery(`
  {
    "total": count(*[_type == "post" && defined(slug.current)]),
    "posts": *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [$offset...$limit] {
      ${postFields}
    }
  }
`)

export const allProjectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(order asc, title asc) {
    ${projectListFields}
  }
`)

export const projectsPaginatedQuery = defineQuery(`
  {
    "total": count(*[_type == "project" && defined(slug.current)]),
    "projects": *[_type == "project" && defined(slug.current)] | order(order asc, title asc) [$offset...$limit] {
      ${projectListFields}
    }
  }
`)
