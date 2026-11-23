import {assist} from '@sanity/assist'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {
  defineDocuments,
  defineLocations,
  presentationTool,
  type DocumentLocation,
} from 'sanity/presentation'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'

import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'post':
      return slug ? `/posts/${slug}` : undefined
    case 'page':
      return slug ? `/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

export function createStudioConfig({
  projectId,
  dataset,
  previewUrl = 'http://localhost:3000',
  basePath,
}: {
  projectId: string
  dataset: string
  previewUrl?: string
  basePath?: string
}) {
  return defineConfig({
    name: 'default',
    title: 'Healing Coral',
    basePath,
    projectId,
    dataset,
    plugins: [
      presentationTool({
        previewUrl: {
          origin: previewUrl,
          previewMode: {
            enable: '/api/draft-mode/enable',
          },
        },
        resolve: {
          mainDocuments: defineDocuments([
            {
              route: '/',
              filter: `_type == "settings" && _id == "siteSettings"`,
            },
            {
              route: '/:slug',
              filter: `_type == "page" && slug.current == $slug || _id == $slug`,
            },
            {
              route: '/posts/:slug',
              filter: `_type == "post" && slug.current == $slug || _id == $slug`,
            },
          ]),
          locations: {
            settings: defineLocations({
              locations: [homeLocation],
              message: 'This document is used on all pages',
              tone: 'positive',
            }),
            page: defineLocations({
              select: {
                name: 'name',
                slug: 'slug.current',
              },
              resolve: (doc) => ({
                locations: [
                  {
                    title: doc?.name || 'Untitled',
                    href: resolveHref('page', doc?.slug)!,
                  },
                ],
              }),
            }),
            post: defineLocations({
              select: {
                title: 'title',
                slug: 'slug.current',
              },
              resolve: (doc) => ({
                locations: [
                  {
                    title: doc?.title || 'Untitled',
                    href: resolveHref('post', doc?.slug)!,
                  },
                  {
                    title: 'Home',
                    href: '/',
                  } satisfies DocumentLocation,
                ].filter(Boolean) as DocumentLocation[],
              }),
            }),
          },
        },
      }),
      structureTool({structure}),
      unsplashImageAsset(),
      assist(),
      visionTool(),
    ],
    schema: {
      types: schemaTypes,
    },
  })
}
