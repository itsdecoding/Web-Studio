import { FounderSpotlightBlock, BlockRenderContext } from './types';
import { escapeHtml } from './utils';

export function renderFounderSpotlightBlock(block: FounderSpotlightBlock, _context: BlockRenderContext): string {
  return `
  <!-- Founder / Lead Doctor Spotlight Block -->
  <section class="wrap" data-block-id="${escapeHtml(block.id)}">
    <div class="founder-sheet">
      <img src="${escapeHtml(block.imageUrl)}" alt="${escapeHtml(block.name)}" class="founder-img" loading="lazy">
      <div>
        <h3 class="founder-name">${escapeHtml(block.name)}</h3>
        <div class="founder-title">${escapeHtml(block.title)}</div>
        <p class="founder-bio">${escapeHtml(block.bio)}</p>
      </div>
    </div>
  </section>`;
}
