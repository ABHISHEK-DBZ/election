import DOMPurify from 'isomorphic-dompurify';

/**
 * Rigorously sanitizes HTML/Markdown strings to prevent XSS attacks.
 * Uses isomorphic-dompurify for safe execution on both client and server.
 * 
 * @param {string} rawContent - The potentially unsafe HTML/Markdown string.
 * @returns {string} - The sanitized string, safe for insertion into the DOM.
 */
export const sanitizeHTML = (rawContent: string): string => {
  if (!rawContent) return '';
  return DOMPurify.sanitize(rawContent, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
};

/**
 * Validates if a given input is a non-empty string.
 * 
 * @param {unknown} input - The input to validate.
 * @returns {boolean} - True if the input is a valid, non-empty string.
 */
export const isValidInput = (input: unknown): input is string => {
  return typeof input === 'string' && input.trim().length > 0;
};
