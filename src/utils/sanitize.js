/**
 * Sanitizes name inputs to accept letters and spaces only.
 * Collapses repeated spaces into one and strips leading spaces.
 * 
 * @param {string} value
 * @returns {string}
 */
export function sanitizeName(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/^\s+/, '')
    .replace(/\s{2,}/g, ' ');
}
