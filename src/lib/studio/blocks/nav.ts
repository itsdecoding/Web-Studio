import { NavBlock, BlockRenderContext } from './types';
import { escapeHtml, cleanPhoneNumber } from './utils';

export function renderNavBlock(block: NavBlock, _context: BlockRenderContext): string {
  const cleanPhone = cleanPhoneNumber(block.phone);
  const ctaText = block.ctaText || 'Call Now';

  return `
  <!-- Floating Glass Nav Block -->
  <div class="wrap nav" data-block-id="${escapeHtml(block.id)}">
    <div class="nav-inner">
      <div class="brand">
        <span class="brand-dot"></span>
        <span>${escapeHtml(block.businessName)}</span>
      </div>
      <a href="tel:${cleanPhone}" class="nav-call">
        <span>📞</span>
        <span>${escapeHtml(ctaText)}</span>
      </a>
    </div>
  </div>`;
}
