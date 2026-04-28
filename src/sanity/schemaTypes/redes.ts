import { defineField, defineType } from 'sanity'

export const redes = defineType({
  name: 'redes',
  title: 'Redes Sociales',
  type: 'document',
  fields: [
    defineField({
      name: 'facebook',
      title: 'Enlace de Facebook',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Enlace de Instagram',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'Enlace de TikTok',
      type: 'url',
    }),
  ],
})
