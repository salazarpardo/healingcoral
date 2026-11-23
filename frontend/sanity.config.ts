'use client'

import {createStudioConfig} from '../studio/src/config'

/**
 * Studio configuration for the embedded Studio at /studio.
 * See https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs
 */
export default createStudioConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  previewUrl: process.env.NEXT_PUBLIC_SANITY_PREVIEW_URL || 'http://localhost:3000',
  basePath: '/studio',
})
