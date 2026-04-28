import { defineField, defineType } from 'sanity'

export const contenidoWeb = defineType({
  name: 'contenidoWeb',
  title: 'Contenido de la Página',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitulo',
      title: 'Título Principal (Hero)',
      type: 'string',
    }),
    defineField({
      name: 'heroDescripcion',
      title: 'Descripción (Hero)',
      type: 'text',
    }),
    defineField({
      name: 'catalogoUrl',
      title: 'URL del Catálogo (Google Drive)',
      description: 'Enlace al catálogo en PDF o Google Drive para el botón en la portada.',
      type: 'url',
    }),
    defineField({
      name: 'mensajeBienvenida',
      title: 'Mensaje de Bienvenida',
      type: 'text',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Número de WhatsApp',
      description: 'Ejemplo: 51999888777 (código de país sin el + seguido del número)',
      type: 'string',
    }),
    defineField({
      name: 'instagramCarouselUrl',
      title: 'URL de Publicación de Instagram (Carrusel)',
      description: 'Enlace de la publicación de Instagram a mostrar',
      type: 'url',
    }),
  ],
})
