import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
  preview: {
    select: {label: 'label'},
    prepare({label}) {
      return {title: label || 'Untitled link'}
    },
  },
})
