import { TopBarBlock, BlockRenderContext } from './types';
import { escapeHtml } from './utils';

export function renderTopBarBlock(block: TopBarBlock, _context: BlockRenderContext): string {
  return `
  <!-- Top Pinsite Bar Block -->
  <div class="pinsite-bar" data-block-id="${escapeHtml(block.id)}">
    <div style="display:flex; align-items:center; gap:8px;">
      <span class="pinsite-pill">${escapeHtml(block.badgeText || 'Pinsite Concept')}</span>
      <span style="color:#FFFFFF; font-weight:600;">${escapeHtml(block.businessName)}</span>
    </div>
    <div>${escapeHtml(block.city)}</div>
  </div>`;
}
