import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './product' 
import restockRequest from './restockRequest' // 1. Add this import

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, restockRequest], // 2. Add it to this array
}