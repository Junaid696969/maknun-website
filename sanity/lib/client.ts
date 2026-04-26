import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  // This uses the helper variables OR the environment variables as a backup
  projectId: projectId || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: dataset || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: apiVersion || '2023-01-01',
  useCdn: false, 
})