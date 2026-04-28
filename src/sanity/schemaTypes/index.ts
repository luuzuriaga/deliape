import { type SchemaTypeDefinition } from 'sanity'

import { producto } from './producto'
import { redes } from './redes'
import { contenidoWeb } from './contenidoWeb'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [producto, redes, contenidoWeb],
}
