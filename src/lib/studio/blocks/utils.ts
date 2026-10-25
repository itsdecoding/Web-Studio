/**
 * Block Engine Utility Functions
 */

export function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function cleanPhoneNumber(phone: string | undefined | null): string {
  if (!phone) return '';
  return phone.replace(/[^0-9+]/g, '');
}

export function cleanDigits(phone: string | undefined | null): string {
  if (!phone) return '';
  return phone.replace(/[^0-9]/g, '');
}
