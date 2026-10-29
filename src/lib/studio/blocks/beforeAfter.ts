import { BeforeAfterBlock, BlockRenderContext } from './types';
import { escapeHtml } from './utils';

export function renderBeforeAfterBlock(block: BeforeAfterBlock, _context: BlockRenderContext): string {
  const tagText = block.tagText || 'VERIFIED TRANSFORMATION';
  const heading = block.heading || 'Clinical Case: <em>Microscopic Precision</em>';
  const subheading =
    block.subheading ||
    'Drag the interactive slider to inspect enamel restoration, margin precision, and natural shade blending.';
  const beforeLabel = block.beforeLabel || 'BEFORE TREATMENT';
  const afterLabel = block.afterLabel || 'AFTER TREATMENT';
  const caseDesc =
    block.caseDescription ||
    'Single-Visit Cosmetic Rehabilitation • Minimal Prep CAD/CAM Zirconia • Lifelong Functional Stability';
  const ctaText = block.ctaText || '📅 Book Your Consultation & 3D Scan';

  const sliderId = `ba-slider-${block.id.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return `
  <!-- Interactive Before & After Comparison Slider Block -->
  <section class="wrap before-after-section" data-block-id="${escapeHtml(block.id)}">
    <div class="before-after-head">
      <div class="section-micro-tag">${escapeHtml(tagText)}</div>
      <h2 class="section-main-title">${heading}</h2>
      <p class="section-main-subhead">${escapeHtml(subheading)}</p>
    </div>

    <div class="ba-card-shell">
      <div id="${sliderId}" class="ba-slider-container">
        <!-- After Image (Base) -->
        <img class="ba-image ba-after" src="${escapeHtml(block.afterImage)}" alt="${escapeHtml(afterLabel)}" loading="lazy">
        <span class="ba-pill-badge ba-badge-after">${escapeHtml(afterLabel)}</span>

        <!-- Before Image (Clipped Overlay) -->
        <div class="ba-before-wrapper">
          <img class="ba-image ba-before" src="${escapeHtml(block.beforeImage)}" alt="${escapeHtml(beforeLabel)}" loading="lazy">
          <span class="ba-pill-badge ba-badge-before">${escapeHtml(beforeLabel)}</span>
        </div>

        <!-- Draggable Divider Line & Handle -->
        <div class="ba-handle">
          <div class="ba-handle-line"></div>
          <div class="ba-handle-button" aria-label="Drag slider">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" transform="rotate(180 12 12)"/>
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          </div>
          <div class="ba-handle-line"></div>
        </div>
      </div>

      <!-- Case Detail Footer -->
      <div class="ba-footer-bar">
        <div class="ba-case-meta">
          <span class="ba-verified-dot"></span>
          <p class="ba-meta-text">${escapeHtml(caseDesc)}</p>
        </div>
        <button type="button" class="ba-cta-button" onclick="window.openStudioBookingModal && window.openStudioBookingModal()">
          <span>${escapeHtml(ctaText)}</span>
          <span style="font-size: 16px;">→</span>
        </button>
      </div>
    </div>
  </section>

  <script>
    (function() {
      const container = document.getElementById('${sliderId}');
      if (!container) return;

      const beforeWrapper = container.querySelector('.ba-before-wrapper');
      const handle = container.querySelector('.ba-handle');
      if (!beforeWrapper || !handle) return;

      let isDragging = false;

      function updateSlider(xPos) {
        const rect = container.getBoundingClientRect();
        let percentage = ((xPos - rect.left) / rect.width) * 100;
        if (percentage < 3) percentage = 3;
        if (percentage > 97) percentage = 97;

        beforeWrapper.style.width = percentage + '%';
        handle.style.left = percentage + '%';
      }

      function onPointerDown(e) {
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        updateSlider(clientX);
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        updateSlider(clientX);
      }

      function onPointerUp() {
        isDragging = false;
      }

      container.addEventListener('mousedown', onPointerDown);
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);

      container.addEventListener('touchstart', onPointerDown, { passive: true });
      window.addEventListener('touchmove', onPointerMove, { passive: true });
      window.addEventListener('touchend', onPointerUp);
    })();
  </script>`;
}
