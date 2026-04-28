import { defineField, defineType } from 'sanity'

export const producto = defineType({
  name: 'producto',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título del Producto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'precio',
      title: 'Precio',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen del Producto',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'instagramReelUrl',
      title: 'URL de Reel de Instagram',
      description: 'Si pegas aquí un enlace a un Reel de Instagram, se mostrará el video en lugar de la foto.',
      type: 'url',
    }),
    defineField({
      name: 'instagramPhotoUrl',
      title: 'URL de Foto de Instagram',
      description: 'Si pegas aquí un enlace a una Foto de Instagram, se mostrará la publicación en lugar de la imagen normal.',
      type: 'url',
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Faja', value: 'faja' },
          { title: 'Lencería', value: 'lenceria' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
