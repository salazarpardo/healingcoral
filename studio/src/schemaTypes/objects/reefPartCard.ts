import {defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const reefPartCard = defineType({
  name: 'reefPartCard',
  title: 'Reef Part Card',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Untitled card', media}
    },
  },
})
