import { BookingIntakeBlock, BlockRenderContext } from './types';
import { escapeHtml, cleanDigits, cleanPhoneNumber } from './utils';

export function renderBookingIntakeBlock(block: BookingIntakeBlock, context: BlockRenderContext): string {
  const bizName = block.businessName || context.businessName;
  const whatsapp = cleanDigits(block.whatsappNumber || context.whatsappNumber);
  const phone = block.phone || context.phone;
  const cleanPhone = cleanPhoneNumber(phone);

  const procedures = block.procedures && block.procedures.length > 0
    ? block.procedures
    : [
        'Single-Sitting Root Canal',
        'Zirconia Ceramic Crowns',
        'Laser Teeth Whitening',
        'Computer-Guided Dental Implants',
        'Clear Orthodontic Aligners',
        'Emergency Consultation',
      ];

  const timingSlots = block.timingSlots && block.timingSlots.length > 0
    ? block.timingSlots
    : [
        'Morning (9:00 AM – 1:00 PM)',
        'Afternoon (1:00 PM – 5:00 PM)',
        'Evening (5:00 PM – 9:00 PM)',
        'Urgent / Same-Day Walk-in',
      ];

  const heading = block.heading || 'Direct Clinical Booking & Inquiries';
  const subheading =
    block.subheading ||
    `Schedule your appointment directly with ${bizName}. Zero reception waiting times guaranteed.`;

  return `
  <!-- Working High-Ticket Booking / Intake Block -->
  <section class="wrap booking-intake-section" data-block-id="${escapeHtml(block.id)}">
    <div class="booking-card-banner">
      <div class="booking-banner-content">
        <div class="section-micro-tag" style="color: #A7F3D0;">FAST-TRACK RESERVATION</div>
        <h2 class="booking-banner-title">${heading}</h2>
        <p class="booking-banner-desc">${escapeHtml(subheading)}</p>
        
        <div class="booking-perks">
          <div class="perk-item">
            <span class="perk-check">✓</span>
            <span>Immediate SMS/WhatsApp Confirmation</span>
          </div>
          <div class="perk-item">
            <span class="perk-check">✓</span>
            <span>Hospital-Grade Sterilized Operatory</span>
          </div>
          <div class="perk-item">
            <span class="perk-check">✓</span>
            <span>Upfront Pricing With Zero Hidden Fees</span>
          </div>
        </div>
      </div>

      <div class="booking-banner-action">
        <button type="button" class="btn-launch-booking" onclick="window.openStudioBookingModal && window.openStudioBookingModal()">
          <span>📅</span>
          <span>Schedule Online Appointment</span>
        </button>
        <a href="tel:${cleanPhone}" class="booking-direct-call">
          <span>Or call directly: <strong>${escapeHtml(phone)}</strong></span>
        </a>
      </div>
    </div>
  </section>

  <!-- Interactive 3-Step Appointment Intake Modal -->
  <div id="studio-booking-modal" class="booking-modal-overlay" style="display: none;">
    <div class="booking-modal-shell" onclick="event.stopPropagation()">
      <button type="button" class="booking-modal-close" onclick="window.closeStudioBookingModal && window.closeStudioBookingModal()" aria-label="Close modal">✕</button>

      <!-- Modal Header -->
      <div class="modal-header-area">
        <div class="modal-clinic-badge">
          <span class="modal-status-dot"></span>
          <span>${escapeHtml(bizName)} • Direct Booking</span>
        </div>
        <h3 class="modal-title">Request Clinical Appointment</h3>
        <p class="modal-subhead">Takes under 30 seconds. Your inquiry routes directly to the practice staff.</p>

        <!-- Step Indicator -->
        <div class="modal-steps-indicator">
          <div class="step-pill step-active" data-step-indicator="1">1. Procedure</div>
          <div class="step-pill" data-step-indicator="2">2. Preferred Time</div>
          <div class="step-pill" data-step-indicator="3">3. Your Details</div>
        </div>
      </div>

      <!-- Step 1: Select Procedure -->
      <div class="modal-step-body" data-step-content="1">
        <label class="modal-field-label">Select Treatment or Concern:</label>
        <div class="procedure-options-grid">
          ${procedures
            .map(
              (p, i) => `
            <label class="procedure-radio-card ${i === 0 ? 'selected' : ''}">
              <input type="radio" name="modal_procedure" value="${escapeHtml(p)}" ${i === 0 ? 'checked' : ''} onchange="window.updateProcedureSelection(this)">
              <span class="proc-name">${escapeHtml(p)}</span>
              <span class="proc-check">✓</span>
            </label>
          `
            )
            .join('')}
        </div>
        <div class="modal-nav-actions">
          <div></div>
          <button type="button" class="btn-modal-next" onclick="window.goToBookingStep(2)">
            <span>Next: Select Time</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <!-- Step 2: Select Time -->
      <div class="modal-step-body" data-step-content="2" style="display: none;">
        <label class="modal-field-label">Select Convenient Window:</label>
        <div class="procedure-options-grid">
          ${timingSlots
            .map(
              (t, i) => `
            <label class="procedure-radio-card ${i === 0 ? 'selected' : ''}">
              <input type="radio" name="modal_timing" value="${escapeHtml(t)}" ${i === 0 ? 'checked' : ''} onchange="window.updateTimingSelection(this)">
              <span class="proc-name">${escapeHtml(t)}</span>
              <span class="proc-check">✓</span>
            </label>
          `
            )
            .join('')}
        </div>
        <div class="modal-nav-actions">
          <button type="button" class="btn-modal-back" onclick="window.goToBookingStep(1)">
            <span>← Back</span>
          </button>
          <button type="button" class="btn-modal-next" onclick="window.goToBookingStep(3)">
            <span>Next: Contact Details</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <!-- Step 3: Contact Info & Confirm -->
      <div class="modal-step-body" data-step-content="3" style="display: none;">
        <div class="form-group">
          <label class="modal-field-label" for="booking_name">Your Full Name *</label>
          <input type="text" id="booking_name" class="modal-text-input" placeholder="e.g. Rahul Sharma" required>
        </div>

        <div class="form-group" style="margin-top: 14px;">
          <label class="modal-field-label" for="booking_phone">Phone / WhatsApp Number *</label>
          <input type="tel" id="booking_phone" class="modal-text-input" placeholder="+91 98765 43210" required>
        </div>

        <div class="form-group" style="margin-top: 14px;">
          <label class="modal-field-label" for="booking_notes">Special Requests / Symptoms (Optional)</label>
          <input type="text" id="booking_notes" class="modal-text-input" placeholder="e.g. Sensitive lower molar, prefer Dr. Sharma">
        </div>

        <div class="modal-summary-box">
          <div class="summary-line">
            <span>Selected Service:</span>
            <strong id="summary-procedure">Single-Sitting Root Canal</strong>
          </div>
          <div class="summary-line">
            <span>Preferred Window:</span>
            <strong id="summary-timing">Morning (9:00 AM – 1:00 PM)</strong>
          </div>
        </div>

        <div class="modal-nav-actions">
          <button type="button" class="btn-modal-back" onclick="window.goToBookingStep(2)">
            <span>← Back</span>
          </button>
          <button type="button" class="btn-modal-confirm" onclick="window.submitBookingInquiry('${whatsapp}', '${escapeHtml(bizName)}')">
            <span>💬 Confirm via WhatsApp</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    (function() {
      window.openStudioBookingModal = function() {
        const modal = document.getElementById('studio-booking-modal');
        if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          window.goToBookingStep(1);
        }
      };

      window.closeStudioBookingModal = function() {
        const modal = document.getElementById('studio-booking-modal');
        if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }
      };

      window.goToBookingStep = function(stepNum) {
        document.querySelectorAll('.modal-step-body').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.step-pill').forEach(el => el.classList.remove('step-active'));

        const targetContent = document.querySelector('[data-step-content="' + stepNum + '"]');
        if (targetContent) targetContent.style.display = 'block';

        const targetPill = document.querySelector('[data-step-indicator="' + stepNum + '"]');
        if (targetPill) targetPill.classList.add('step-active');

        // Update summary text
        const procRadio = document.querySelector('input[name="modal_procedure"]:checked');
        const timeRadio = document.querySelector('input[name="modal_timing"]:checked');
        const sumProc = document.getElementById('summary-procedure');
        const sumTime = document.getElementById('summary-timing');
        if (sumProc && procRadio) sumProc.textContent = procRadio.value;
        if (sumTime && timeRadio) sumTime.textContent = timeRadio.value;
      };

      window.updateProcedureSelection = function(radio) {
        document.querySelectorAll('input[name="modal_procedure"]').forEach(r => {
          const card = r.closest('.procedure-radio-card');
          if (card) card.classList.remove('selected');
        });
        const parentCard = radio.closest('.procedure-radio-card');
        if (parentCard) parentCard.classList.add('selected');
      };

      window.updateTimingSelection = function(radio) {
        document.querySelectorAll('input[name="modal_timing"]').forEach(r => {
          const card = r.closest('.procedure-radio-card');
          if (card) card.classList.remove('selected');
        });
        const parentCard = radio.closest('.procedure-radio-card');
        if (parentCard) parentCard.classList.add('selected');
      };

      window.submitBookingInquiry = function(waNum, bizTitle) {
        const nameInput = document.getElementById('booking_name');
        const phoneInput = document.getElementById('booking_phone');
        const notesInput = document.getElementById('booking_notes');

        const name = (nameInput && nameInput.value.trim()) || 'Patient';
        const contact = (phoneInput && phoneInput.value.trim()) || '';
        const notes = (notesInput && notesInput.value.trim()) || 'None';

        if (!contact) {
          alert('Please enter your contact phone or WhatsApp number.');
          if (phoneInput) phoneInput.focus();
          return;
        }

        const procRadio = document.querySelector('input[name="modal_procedure"]:checked');
        const timeRadio = document.querySelector('input[name="modal_timing"]:checked');
        const selectedProc = procRadio ? procRadio.value : 'General Consultation';
        const selectedTime = timeRadio ? timeRadio.value : 'Morning Window';

        const textMessage = 
          "Hello " + bizTitle + ",\n\n" +
          "I would like to schedule an appointment:\n" +
          "• Name: " + name + "\n" +
          "• Phone: " + contact + "\n" +
          "• Treatment: " + selectedProc + "\n" +
          "• Preferred Time: " + selectedTime + "\n" +
          (notes && notes !== 'None' ? "• Notes: " + notes + "\n\n" : "\n") +
          "Please let me know your earliest available slot. Thank you!";

        const waUrl = "https://wa.me/" + waNum + "?text=" + encodeURIComponent(textMessage);
        window.open(waUrl, '_blank');
        window.closeStudioBookingModal();
      };
    })();
  </script>`;
}
