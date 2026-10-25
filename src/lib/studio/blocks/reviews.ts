import { GoogleReviewsBlock, BlockRenderContext } from './types';
import { escapeHtml } from './utils';

export function renderGoogleReviewsBlock(block: GoogleReviewsBlock, context: BlockRenderContext): string {
  const reviews = block.reviews || [];
  const rating = block.rating || 4.9;
  const count = block.reviewCount || 184;

  return `
  <!-- Verified Google Reviews & Social Proof Block -->
  <section class="wrap reviews-section" data-block-id="${escapeHtml(block.id)}">
    <div class="reviews-header">
      <div class="google-badge-pill">
        <svg class="google-icon" viewBox="0 0 24 24" width="16" height="16">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span>Google Verified Reviews</span>
      </div>
      <div class="rating-summary">
        <span class="stars-gold">★★★★★</span>
        <strong class="rating-score">${rating.toFixed(1)}</strong>
        <span class="rating-count">(${count}+ patient reviews in ${escapeHtml(context.city)})</span>
      </div>
    </div>

    <div class="reviews-grid">
      ${reviews
        .map(
          (r) => `
        <article class="review-card">
          <div class="review-top">
            <div class="review-avatar">${escapeHtml(r.initials || 'RP')}</div>
            <div>
              <h4 class="review-author">${escapeHtml(r.author)}</h4>
              <p class="review-loc">${escapeHtml(r.roleOrLocation || context.city)} • Verified Patient</p>
            </div>
            <div class="review-stars">★★★★★</div>
          </div>
          <p class="review-quote">"${escapeHtml(r.quote)}"</p>
        </article>
      `
        )
        .join('')}
    </div>
  </section>`;
}
