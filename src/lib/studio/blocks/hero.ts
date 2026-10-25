import { HeroBlock, BlockRenderContext } from './types';
import { escapeHtml, cleanPhoneNumber, cleanDigits } from './utils';

export function renderHeroBlock(block: HeroBlock, context: BlockRenderContext): string {
  const cleanPhone = cleanPhoneNumber(block.phone || context.phone);
  const cleanWa = cleanDigits(block.whatsappNumber || context.whatsappNumber);
  const displayPhone = block.phone || context.phone || '+91 98765 43210';
  const bizName = context.businessName;

  const primaryCta = block.primaryCtaText || `Call Practice (${displayPhone})`;
  const secondaryCta = block.secondaryCtaText || 'WhatsApp Consultation';

  const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${bizName}, I would like to schedule a consultation.`)}`;

  return `
  <!-- Layered Tactile Hero Sheet Block -->
  <section class="hero" data-block-id="${escapeHtml(block.id)}">
    <div class="hero-sheet">
      <div class="hero-bg" style="background-image: url('${escapeHtml(block.heroImageUrl)}');"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <span>✨</span>
          <span>${escapeHtml(block.badgeText || 'Bespoke Concept')}</span>
        </div>
        <h1 class="hero-title">
          ${escapeHtml(block.headlineLine1)}
          <em>${escapeHtml(block.headlineLine2)}</em>
        </h1>
        <p class="hero-subhead">${escapeHtml(block.subheadline)}</p>
        <div class="hero-actions">
          <a href="tel:${cleanPhone}" class="btn-action-primary">
            <span>📞</span>
            <span>${escapeHtml(primaryCta)}</span>
          </a>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-action-secondary">
            <span>💬</span>
            <span>${escapeHtml(secondaryCta)}</span>
          </a>
        </div>
      </div>
    </div>
  </section>`;
}
