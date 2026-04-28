'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Contenido de la Página')
              .child(
                S.document()
                  .schemaType('contenidoWeb')
                  .documentId('contenidoWeb')
              ),
            S.listItem()
              .title('Redes Sociales')
              .child(
                S.document()
                  .schemaType('redes')
                  .documentId('redes')
              ),
            S.divider(),
            S.documentTypeListItem('producto').title('Productos'),
          ]),
    }),
  ],
})
