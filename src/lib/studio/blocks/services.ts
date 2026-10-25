import { ServicesRailBlock, BlockRenderContext } from './types';
import { escapeHtml } from './utils';

export function renderServicesRailBlock(block: ServicesRailBlock, _context: BlockRenderContext): string {
  const services = block.services || [];

  return `
  <!-- Horizontal Touch-Snap Treatment Rail Block -->
  <section class="services-sheet" data-block-id="${escapeHtml(block.id)}">
    <div class="services-head">
      <div style="font-size:11px; text-transform:uppercase; font-weight:800; letter-spacing:1px; color:#A7F3D0; margin-bottom:4px;">
        ${escapeHtml(block.sectionTag || 'SPECIALIZED TREATMENTS')}
      </div>
      <h2>${block.sectionTitle || 'Comprehensive <em>Clinical Care</em>'}</h2>
    </div>

    <div class="rail">
      ${services
        .map(
          (s) => `
        <article class="treatment-card">
          ${s.image ? `<img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.title)}" loading="lazy">` : ''}
          <h4>${escapeHtml(s.title)}</h4>
          <p>${escapeHtml(s.description || 'Specialized procedure backed by modern diagnostic standards.')}</p>
        </article>
      `
        )
        .join('')}
    </div>
  </section>`;
}
