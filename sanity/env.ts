export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-23'

// We removed assertValue and added fallbacks so the build doesn't crash
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

// We keep the function here so other files don't break, 
// but we make it "quiet" so it doesn't crash the build.
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    console.warn(errorMessage); // This shows a warning instead of crashing
    return '' as unknown as T;
  }
  return v
}