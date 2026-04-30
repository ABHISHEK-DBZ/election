import { sanitizeHTML, isValidInput } from '@/utils/sanitize';

describe('Sanitize Utility', () => {
  it('strips dangerous scripts from HTML', () => {
    const malicious = '<p>Hello <script>alert("XSS")</script> World</p>';
    const safe = sanitizeHTML(malicious);
    expect(safe).toBe('<p>Hello  World</p>');
  });

  it('allows safe tags like bold and italics', () => {
    const input = '<b>Bold</b> and <i>Italic</i>';
    const output = sanitizeHTML(input);
    expect(output).toBe('<b>Bold</b> and <i>Italic</i>');
  });

  it('validates correct string inputs', () => {
    expect(isValidInput('test')).toBe(true);
    expect(isValidInput('  spaced  ')).toBe(true);
  });

  it('rejects empty or whitespace-only strings', () => {
    expect(isValidInput('')).toBe(false);
    expect(isValidInput('   ')).toBe(false);
  });
});
