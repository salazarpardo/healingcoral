import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Our Team',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section title',
      type: 'string',
      initialValue: 'Our team',
    }),
    defineField({
      name: 'people',
      title: 'Team members',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title || 'Our Team',
        subtitle: 'Team section',
      }
    },
  },
})
