import {defineField, defineType} from 'sanity'
import {ShareIcon} from '@sanity/icons'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  icon: ShareIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Twitter / X', value: 'twitter'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'Youtube', value: 'youtube'},
          {title: 'Opensea', value: 'opensea'},
          {title: 'Discord', value: 'discord'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {platform: 'platform'},
    prepare({platform}) {
      return {
        title: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Social link',
      }
    },
  },
})
