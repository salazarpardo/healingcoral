import {ComposeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const collectionsPage = defineType({
  name: 'collectionsPage',
  title: 'Collections Page',
  type: 'document',
  icon: ComposeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'intro', title: 'Our collections intro'},
    {name: 'list', title: 'Collections list'},
  ],
  fields: [
    defineField({
      name: 'heroPreTitle',
      title: 'Hero pre-title',
      type: 'string',
      group: 'hero',
      initialValue: 'OUR COLLECTIONS',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      group: 'hero',
      initialValue: 'Discover our NFTs collections.',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta',
      title: 'Hero CTA button',
      type: 'button',
      group: 'hero',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero background image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
    }),
    defineField({
      name: 'introTitle',
      title: 'Intro section title',
      type: 'string',
      group: 'intro',
      initialValue: 'Our collections',
    }),
    defineField({
      name: 'introBody',
      title: 'Intro paragraph',
      type: 'text',
      group: 'intro',
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      group: 'list',
      of: [{type: 'reference', to: [{type: 'collection'}]}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Collections Page'}
    },
  },
})
