import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const collection = defineType({
  name: 'collection',
  title: 'NFT Collection',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Collection title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {source: 'title', maxLength: 96},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Collection images',
      type: 'array',
      description: 'Add 4 images for the 2×2 grid (coral/NFT previews).',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.required().min(4).max(4),
    }),
    defineField({
      name: 'viewNftsUrl',
      title: 'View NFTs URL',
      type: 'url',
      description: 'Link for the "View NFTs" button (e.g. OpenSea, marketplace).',
    }),
    defineField({
      name: 'readMoreLink',
      title: 'Read more link',
      type: 'link',
      description: 'Optional link for "Read more" (page, post, or URL).',
    }),
    defineField({
      name: 'creator',
      title: 'Creator / Artist',
      type: 'reference',
      to: [{type: 'person'}],
      description: 'Profile shown on the right (photo, name, location, bio).',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', media: 'images.0'},
    prepare({title, media}) {
      return {title: title || 'Untitled collection', media}
    },
  },
})
