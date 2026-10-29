import { TrackRecordBlock, BlockRenderContext } from './types';
import { escapeHtml } from './utils';

export function renderTrackRecordBlock(block: TrackRecordBlock, _context: BlockRenderContext): string {
  const stats = block.stats || [
    { value: '$140M+', label: 'Recovered For Clients', sublabel: 'Verdicts & Settlements' },
    { value: '98.4%', label: 'Trial Success Rate', sublabel: 'State & Federal Courts' },
    { value: '25+ Yrs', label: 'Courtroom Trial Mastery', sublabel: 'Lead Trial Counsel' },
    { value: '1,200+', label: 'Complex Cases Resolved', sublabel: 'Zero Upfront Cost' },
  ];

  return `
  <!-- High-Status Track Record Ticker Block -->
  <section class="wrap track-record-section" data-block-id="${escapeHtml(block.id)}">
    ${block.headline ? `<h3 class="track-record-head">${escapeHtml(block.headline)}</h3>` : ''}
    <div class="track-record-grid">
      ${stats
        .map(
          (s) => `
        <div class="stat-pill-card">
          <div class="stat-huge-number">${escapeHtml(s.value)}</div>
          <div class="stat-main-label">${escapeHtml(s.label)}</div>
          ${s.sublabel ? `<div class="stat-sub-label">${escapeHtml(s.sublabel)}</div>` : ''}
        </div>
      `
        )
        .join('')}
    </div>
  </section>`;
}
