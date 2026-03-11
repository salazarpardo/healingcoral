import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'invest', title: 'Invest Section'},
    {name: 'reefPart', title: 'How to be part of the reef'},
    {name: 'projects', title: 'Our projects'},
    {name: 'news', title: 'Coral News'},
    {name: 'newsletter', title: 'Join the movement'},
  ],
  fields: [
    defineField({
      name: 'heroPreTitle',
      title: 'Hero pre-title',
      type: 'string',
      group: 'hero',
      initialValue: 'CONSERVATION',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
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
      description: 'Fallback when no video is set, or poster for video',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroBackgroundVideo',
      title: 'Hero background video',
      type: 'file',
      group: 'hero',
      description:
        'Optional. Short, muted loop works best. Image above is used as poster/fallback.',
      options: {
        accept: 'video/mp4,video/webm',
      },
    }),
    defineField({
      name: 'investPreTitle',
      title: 'Invest pre-title',
      type: 'string',
      group: 'invest',
      initialValue: 'CONSERVATION',
    }),
    defineField({
      name: 'investHeadline',
      title: 'Invest headline',
      type: 'string',
      group: 'invest',
    }),
    defineField({
      name: 'investBody',
      title: 'Invest body',
      type: 'array',
      group: 'invest',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'investReadMoreLink',
      title: 'Read more link',
      type: 'link',
      group: 'invest',
    }),
    defineField({
      name: 'reefPartTitle',
      title: 'Section title',
      type: 'string',
      group: 'reefPart',
      initialValue: 'How to be part of the reef?',
    }),
    defineField({
      name: 'reefPartCards',
      title: 'Cards',
      type: 'array',
      group: 'reefPart',
      of: [{type: 'reefPartCard'}],
    }),
    defineField({
      name: 'projectsTitle',
      title: 'Section title',
      type: 'string',
      group: 'projects',
      initialValue: 'Our projects',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      group: 'projects',
      of: [{type: 'reference', to: [{type: 'project'}]}],
    }),
    defineField({
      name: 'newsTitle',
      title: 'Section title',
      type: 'string',
      group: 'news',
      initialValue: 'Coral News',
    }),
    defineField({
      name: 'newsItems',
      title: 'News items',
      type: 'array',
      group: 'news',
      description: 'Leave empty to show latest posts automatically',
      of: [{type: 'reference', to: [{type: 'post'}]}],
    }),
    defineField({
      name: 'newsletterTitle',
      title: 'Section title',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Join the movement',
    }),
    defineField({
      name: 'newsletterDescription',
      title: 'Description',
      type: 'text',
      group: 'newsletter',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
