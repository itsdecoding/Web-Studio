import { TrustPillarsBlock, BlockRenderContext } from './types';
import { escapeHtml } from './utils';

export function renderTrustPillarsBlock(block: TrustPillarsBlock, _context: BlockRenderContext): string {
  const pillars = block.pillars || [];

  return `
  <!-- Value Pillars Block -->
  <section class="wrap" data-block-id="${escapeHtml(block.id)}">
    <div class="pillars-grid">
      ${pillars
        .map(
          (p, idx) => `
        <div class="pillar-card">
          <div class="pillar-icon">${escapeHtml(p.number || `0${idx + 1}`)}</div>
          <h4>${escapeHtml(p.title)}</h4>
          <p>${escapeHtml(p.description)}</p>
        </div>
      `
        )
        .join('')}
    </div>
  </section>`;
}
