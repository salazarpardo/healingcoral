import {defineField, defineType} from 'sanity'
import {ListIcon} from '@sanity/icons'

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'string',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'navItem'}],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Footer column'}
    },
  },
})
