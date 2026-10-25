import { PhilosophyTiltsBlock, BlockRenderContext } from './types';
import { escapeHtml } from './utils';

export function renderPhilosophyTiltsBlock(block: PhilosophyTiltsBlock, _context: BlockRenderContext): string {
  return `
  <!-- Philosophy & Dual Tilt Feature Block -->
  <section class="wrap philosophy" data-block-id="${escapeHtml(block.id)}">
    <div class="philosophy-tag">${escapeHtml(block.tagText || 'OUR CLINICAL STANDARD')}</div>
    <h2 class="philosophy-statement">
      ${block.statementHtml || 'Microscopic precision, transparent pricing, and <em>patient-first care</em> tailored to every procedure.'}
    </h2>

    <div class="tilts-container">
      <div class="tilt-card tilt-left">
        <img src="${escapeHtml(block.tilt1ImageUrl)}" alt="Facility Photo" loading="lazy">
      </div>
      <div class="tilt-card tilt-right">
        <img src="${escapeHtml(block.tilt2ImageUrl)}" alt="Clinical Standard" loading="lazy">
      </div>
    </div>
  </section>`;
}
