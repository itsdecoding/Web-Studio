import { StickyCallbarBlock, BlockRenderContext } from './types';
import { escapeHtml, cleanPhoneNumber, cleanDigits } from './utils';

export function renderStickyCallbarBlock(block: StickyCallbarBlock, context: BlockRenderContext): string {
  const cleanPhone = cleanPhoneNumber(block.phone || context.phone);
  const cleanWa = cleanDigits(block.whatsappNumber || context.whatsappNumber);
  const bizName = block.businessName || context.businessName;

  const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${bizName}, I would like to schedule an appointment.`)}`;

  return `
  <!-- Sticky Bottom Mobile Conversion Bar Block -->
  <div class="callbar" data-block-id="${escapeHtml(block.id)}">
    <a href="tel:${cleanPhone}" class="callbar-btn callbar-phone">
      <span>📞</span>
      <span>Call Now</span>
    </a>
    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="callbar-btn callbar-wa">
      <span>💬</span>
      <span>WhatsApp</span>
    </a>
  </div>`;
}
