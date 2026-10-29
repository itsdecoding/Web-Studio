import { BlockThemeTokens } from './types';

export function generateMasterStyles(theme: BlockThemeTokens): string {
  return `
    /* CRITICAL: KILL ALL UGLY DESKTOP SCROLLBARS FOR REAL IOS GLASS FEEL */
    html, body {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    ::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }

    :root {
      --canvas: ${theme.canvas};
      --sheet: ${theme.sheetBg};
      --paper: ${theme.paper};
      --card-bg: ${theme.cardBg};
      --ink: ${theme.text};
      --muted: ${theme.textMuted};
      --accent: ${theme.accent};
      --mint: ${theme.mint};
      --mint-txt: ${theme.mintText};
      --r-sheet: ${theme.radiusSheet};
      --r-card: ${theme.radiusCard};
      --serif: ${theme.fontSerif};
      --sans: ${theme.fontSans};
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--canvas);
      color: var(--ink);
      font-family: var(--sans);
      line-height: 1.55;
      -webkit-font-smoothing: antialiased;
      padding-bottom: 96px;
      overflow-x: hidden;
    }

    a { text-decoration: none; color: inherit; }
    img { display: block; max-width: 100%; object-fit: cover; }
    em { font-family: var(--serif); font-style: italic; font-weight: 500; }

    .wrap {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Common Micro Typography */
    .section-micro-tag {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: var(--accent);
      margin-bottom: 8px;
    }
    .section-main-title {
      font-size: clamp(26px, 4.5vw, 42px);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.15;
      color: var(--ink);
    }
    .section-main-title em {
      color: var(--accent);
      font-weight: 400;
    }
    .section-main-subhead {
      font-size: 14.5px;
      color: var(--muted);
      line-height: 1.6;
      margin-top: 8px;
      max-width: 620px;
    }

    /* ---------- Signature Top Pinsite Status Bar ---------- */
    .pinsite-bar {
      background: #0B0E14;
      color: #94A3B8;
      font-size: 11.5px;
      font-weight: 500;
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-family: var(--sans);
      position: sticky;
      top: 0;
      z-index: 99;
    }
    .pinsite-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(34, 197, 94, 0.15);
      color: #4ADE80;
      padding: 3px 10px;
      border-radius: 99px;
      font-weight: 700;
      font-size: 10px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .pinsite-pill::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #4ADE80;
      box-shadow: 0 0 6px #4ADE80;
    }

    /* ---------- Floating Glass Nav ---------- */
    .nav {
      padding: 14px 0;
    }
    .nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 0, 0, 0.06);
      padding: 8px 16px;
      border-radius: 99px;
      box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.08);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #111827;
      font-weight: 800;
      font-size: 15px;
      letter-spacing: -0.3px;
    }
    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
    }
    .nav-call {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #111827;
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 700;
      padding: 7px 16px;
      border-radius: 99px;
      transition: transform 0.2s;
    }
    .nav-call:hover { transform: scale(1.02); }

    /* ---------- $1,000 Layered Tactile Hero Sheet ---------- */
    .hero {
      padding: 10px;
    }
    .hero-sheet {
      position: relative;
      border-radius: var(--r-sheet);
      background: var(--sheet);
      color: #FFFFFF;
      overflow: hidden;
      min-height: 560px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 48px 32px;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
    }
    .hero-sheet::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(70% 80% at 90% 20%, rgba(255,255,255,0.08), transparent 70%),
                  radial-gradient(60% 70% at 0% 100%, rgba(0,0,0,0.5), transparent 70%);
      pointer-events: none;
    }
    .hero-bg {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 65%;
      background-size: cover;
      background-position: 50% 30%;
      background-repeat: no-repeat;
      opacity: 0.45;
      -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 30%, #000 70%);
      mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 30%, #000 70%);
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 620px;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 20px;
      color: #A7F3D0;
    }
    .hero-title {
      font-size: clamp(38px, 8vw, 68px);
      font-weight: 800;
      line-height: 1.02;
      letter-spacing: -0.04em;
      margin-bottom: 16px;
    }
    .hero-title em {
      color: #A7F3D0;
      display: block;
      font-weight: 400;
      font-size: 1.08em;
    }
    .hero-subhead {
      font-size: 15px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 28px;
      max-width: 520px;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .btn-action-primary {
      background: var(--accent);
      color: #FFFFFF;
      font-weight: 700;
      font-size: 13.5px;
      padding: 13px 26px;
      border-radius: 99px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      transition: transform 0.2s;
      cursor: pointer;
    }
    .btn-action-primary:hover { transform: translateY(-1px); }
    .btn-action-secondary {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      color: #FFFFFF;
      font-weight: 600;
      font-size: 13.5px;
      padding: 13px 22px;
      border-radius: 99px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    /* ---------- Track Record & Authority Stats ---------- */
    .track-record-section {
      padding: 30px 0 20px;
    }
    .track-record-head {
      text-align: center;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--accent);
      margin-bottom: 20px;
    }
    .track-record-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .stat-pill-card {
      background: var(--paper);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: var(--r-card);
      padding: 24px 20px;
      text-align: center;
      box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s;
    }
    .stat-pill-card:hover { transform: translateY(-2px); }
    .stat-huge-number {
      font-size: clamp(32px, 5vw, 44px);
      font-weight: 900;
      letter-spacing: -0.04em;
      color: var(--accent);
      line-height: 1;
      margin-bottom: 8px;
    }
    .stat-main-label {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--ink);
    }
    .stat-sub-label {
      font-size: 11.5px;
      color: var(--muted);
      margin-top: 4px;
    }

    /* ---------- Signature Dual Tilt Philosophy Section ---------- */
    .philosophy {
      padding: 60px 0 50px;
      text-align: center;
      position: relative;
    }
    .philosophy-tag {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: var(--accent);
      margin-bottom: 12px;
    }
    .philosophy-statement {
      font-size: clamp(22px, 4vw, 36px);
      line-height: 1.35;
      letter-spacing: -0.02em;
      max-width: 720px;
      margin: 0 auto 36px;
      color: var(--ink);
    }
    .philosophy-statement em {
      color: var(--accent);
      font-weight: 400;
    }
    .tilts-container {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 40px;
    }
    .tilt-card {
      width: 170px;
      aspect-ratio: 4/5;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(0, 0, 0, 0.08);
      background: #FFFFFF;
    }
    .tilt-card.tilt-left { transform: rotate(-6deg); }
    .tilt-card.tilt-right { transform: rotate(6deg); }
    .tilt-card img { width: 100%; height: 100%; object-fit: cover; }

    /* ---------- INTERACTIVE BEFORE & AFTER SLIDER ---------- */
    .before-after-section {
      padding: 40px 0 60px;
    }
    .before-after-head {
      text-align: center;
      margin-bottom: 28px;
    }
    .before-after-head .section-main-subhead {
      margin-left: auto;
      margin-right: auto;
    }
    .ba-card-shell {
      background: var(--paper);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: var(--r-sheet);
      overflow: hidden;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.12);
    }
    .ba-slider-container {
      position: relative;
      width: 100%;
      height: 480px;
      overflow: hidden;
      user-select: none;
      -webkit-user-select: none;
      touch-action: pan-y;
      background: #000;
      cursor: ew-resize;
    }
    .ba-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .ba-before-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
      z-index: 2;
    }
    .ba-before-wrapper .ba-before {
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-width: none;
    }
    .ba-pill-badge {
      position: absolute;
      bottom: 20px;
      z-index: 4;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 99px;
      pointer-events: none;
    }
    .ba-badge-before { left: 20px; }
    .ba-badge-after { right: 20px; }

    /* Draggable Handle */
    .ba-handle {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      transform: translateX(-50%);
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
    }
    .ba-handle-line {
      flex: 1;
      width: 2px;
      background: #FFFFFF;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    }
    .ba-handle-button {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #FFFFFF;
      color: #111827;
      border: 2px solid var(--accent);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }

    .ba-footer-bar {
      padding: 20px 28px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--paper);
      border-top: 1px solid rgba(0, 0, 0, 0.06);
    }
    @media (min-width: 768px) {
      .ba-footer-bar {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
    .ba-case-meta {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ba-verified-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
      flex-shrink: 0;
    }
    .ba-meta-text {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--ink);
    }
    .ba-cta-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--accent);
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 700;
      padding: 10px 20px;
      border-radius: 99px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      transition: transform 0.2s;
    }
    .ba-cta-button:hover { transform: translateY(-1px); }

    /* ---------- Horizontal Touch-Snap Treatment Rail ---------- */
    .services-sheet {
      border-radius: var(--r-sheet);
      background: var(--sheet);
      color: #FFFFFF;
      padding: 48px 0;
      margin: 10px;
      overflow: hidden;
    }
    .services-head {
      padding: 0 24px;
      margin-bottom: 24px;
    }
    .services-head h2 {
      font-size: clamp(28px, 5vw, 44px);
      font-weight: 800;
      letter-spacing: -0.03em;
    }
    .services-head h2 em {
      color: #A7F3D0;
      font-weight: 400;
    }
    .rail {
      display: flex;
      gap: 14px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding: 10px 24px 20px;
      scrollbar-width: none;
    }
    .rail::-webkit-scrollbar { display: none; }
    .treatment-card {
      scroll-snap-align: start;
      flex: 0 0 280px;
      border-radius: var(--r-card);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 10px 10px 18px;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s;
    }
    .treatment-card:hover { transform: translateY(-3px); }
    .treatment-card img {
      width: 100%;
      height: 160px;
      border-radius: 14px;
      object-fit: cover;
      margin-bottom: 14px;
    }
    .treatment-card h4 {
      font-size: 16px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 6px;
      padding: 0 6px;
    }
    .treatment-card p {
      font-size: 12.5px;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.5;
      padding: 0 6px;
      flex: 1;
    }

    /* ---------- 4 Value Pillars ---------- */
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      padding: 40px 0;
    }
    .pillar-card {
      background: var(--paper);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: var(--r-card);
      padding: 24px;
      box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.05);
    }
    .pillar-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--mint);
      color: var(--mint-txt);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 16px;
    }
    .pillar-card h4 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .pillar-card p {
      font-size: 13px;
      color: var(--muted);
      line-height: 1.5;
    }

    /* ---------- Doctor / Founder Spotlight ---------- */
    .founder-sheet {
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: var(--r-sheet);
      padding: 32px;
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 24px;
      align-items: center;
      box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.08);
      margin-bottom: 40px;
    }
    .founder-img {
      width: 140px;
      height: 140px;
      border-radius: 20px;
      object-fit: cover;
      border: 3px solid var(--accent);
    }
    .founder-name {
      font-size: 22px;
      font-weight: 800;
      color: var(--ink);
    }
    .founder-title {
      font-size: 13.5px;
      color: var(--accent);
      font-weight: 700;
      margin-bottom: 10px;
    }
    .founder-bio {
      font-size: 13.5px;
      color: var(--muted);
      line-height: 1.6;
    }

    /* ---------- Google Reviews Social Proof ---------- */
    .reviews-section {
      padding: 20px 0 50px;
    }
    .reviews-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 24px;
      gap: 8px;
    }
    .google-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.08);
      padding: 6px 14px;
      border-radius: 99px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
      font-size: 12px;
      font-weight: 700;
      color: #1F2937;
    }
    .rating-summary {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--muted);
    }
    .stars-gold {
      color: #F59E0B;
      font-size: 16px;
      letter-spacing: 2px;
    }
    .rating-score {
      font-size: 15px;
      font-weight: 800;
      color: var(--ink);
    }
    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }
    .review-card {
      background: var(--paper);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: var(--r-card);
      padding: 20px;
      box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .review-top {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .review-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--accent);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 800;
      flex-shrink: 0;
    }
    .review-author {
      font-size: 14px;
      font-weight: 700;
      color: var(--ink);
    }
    .review-loc {
      font-size: 11px;
      color: var(--muted);
    }
    .review-stars {
      margin-left: auto;
      color: #F59E0B;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .review-quote {
      font-size: 13px;
      color: var(--ink);
      line-height: 1.55;
      font-style: italic;
    }

    /* ---------- WORKING BOOKING BANNER & MODAL ---------- */
    .booking-intake-section {
      padding: 20px 0 50px;
    }
    .booking-card-banner {
      background: var(--sheet);
      color: #FFFFFF;
      border-radius: var(--r-sheet);
      padding: 44px 36px;
      display: flex;
      flex-direction: column;
      gap: 28px;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
    }
    @media (min-width: 900px) {
      .booking-card-banner {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
    .booking-banner-content {
      max-width: 580px;
    }
    .booking-banner-title {
      font-size: clamp(26px, 4vw, 38px);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 12px;
    }
    .booking-banner-desc {
      font-size: 14.5px;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .booking-perks {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .perk-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #A7F3D0;
    }
    .perk-check {
      font-weight: 800;
      background: rgba(16, 185, 129, 0.2);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
    }
    .booking-banner-action {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 280px;
    }
    .btn-launch-booking {
      background: var(--accent);
      color: #FFFFFF;
      font-size: 15px;
      font-weight: 800;
      padding: 16px 28px;
      border-radius: 99px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s;
    }
    .btn-launch-booking:hover { transform: scale(1.02); }
    .booking-direct-call {
      text-align: center;
      font-size: 12.5px;
      color: rgba(255, 255, 255, 0.7);
    }
    .booking-direct-call strong { color: #FFFFFF; }

    /* Modal Overlay & Card */
    .booking-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .booking-modal-shell {
      background: #FFFFFF;
      color: #111827;
      border-radius: 24px;
      width: 100%;
      max-width: 520px;
      padding: 32px;
      position: relative;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.5);
      max-height: 90vh;
      overflow-y: auto;
    }
    .booking-modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: #F3F4F6;
      color: #4B5563;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-header-area {
      margin-bottom: 24px;
    }
    .modal-clinic-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #ECFDF5;
      color: #065F46;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 99px;
      margin-bottom: 10px;
    }
    .modal-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
    }
    .modal-title {
      font-size: 22px;
      font-weight: 800;
      color: #111827;
      line-height: 1.2;
    }
    .modal-subhead {
      font-size: 13px;
      color: #6B7280;
      margin-top: 4px;
    }
    .modal-steps-indicator {
      display: flex;
      gap: 8px;
      margin-top: 18px;
    }
    .step-pill {
      flex: 1;
      text-align: center;
      font-size: 11px;
      font-weight: 700;
      padding: 6px;
      border-radius: 8px;
      background: #F3F4F6;
      color: #9CA3AF;
    }
    .step-pill.step-active {
      background: var(--accent);
      color: #FFFFFF;
    }
    .modal-field-label {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #4B5563;
      margin-bottom: 12px;
      display: block;
    }
    .procedure-options-grid {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 24px;
    }
    .procedure-radio-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1.5px solid #E5E7EB;
      background: #F9FAFB;
      cursor: pointer;
      font-size: 13.5px;
      font-weight: 600;
      transition: all 0.2s;
    }
    .procedure-radio-card input { display: none; }
    .procedure-radio-card .proc-check { display: none; color: var(--accent); font-weight: 800; }
    .procedure-radio-card.selected {
      border-color: var(--accent);
      background: #FFF;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .procedure-radio-card.selected .proc-check { display: inline; }
    .modal-text-input {
      width: 100%;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1.5px solid #E5E7EB;
      background: #F9FAFB;
      font-size: 14px;
      font-family: inherit;
      color: #111827;
      outline: none;
    }
    .modal-text-input:focus {
      border-color: var(--accent);
      background: #FFF;
    }
    .modal-summary-box {
      margin-top: 16px;
      padding: 14px;
      border-radius: 12px;
      background: #F3F4F6;
      font-size: 12.5px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .summary-line {
      display: flex;
      justify-content: space-between;
    }
    .summary-line strong { color: var(--accent); }
    .modal-nav-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 20px;
    }
    .btn-modal-back {
      padding: 10px 18px;
      border-radius: 99px;
      border: 1px solid #D1D5DB;
      background: transparent;
      color: #4B5563;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-modal-next {
      padding: 12px 24px;
      border-radius: 99px;
      border: none;
      background: #111827;
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-modal-confirm {
      padding: 12px 24px;
      border-radius: 99px;
      border: none;
      background: #25D366;
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    }

    /* ---------- Sticky Mobile Conversion Bar (.callbar) ---------- */
    .callbar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      padding: 12px 16px;
      display: flex;
      gap: 10px;
      z-index: 1000;
    }
    .callbar-btn {
      flex: 1;
      padding: 14px;
      border-radius: 99px;
      font-weight: 700;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
    }
    .callbar-phone {
      background: var(--accent);
      color: #FFFFFF;
    }
    .callbar-wa {
      background: #25D366;
      color: #FFFFFF;
    }

    /* ---------- DESKTOP FLUID RESPONSIVE OVERHAUL (1024px+) ---------- */
    @media (min-width: 1024px) {
      .hero {
        padding: 24px 20px;
      }
      .hero-sheet {
        min-height: 640px;
        padding: 64px 56px;
      }
      .hero-bg {
        width: 58%;
        opacity: 0.55;
      }
      .hero-content {
        max-width: 680px;
      }
      .services-sheet {
        padding: 60px 40px;
        margin: 20px auto;
        max-width: 1200px;
      }
      .services-head {
        padding: 0;
      }
      .rail {
        padding: 20px 0 10px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        overflow: visible;
        gap: 20px;
      }
      .treatment-card {
        flex: auto;
      }
      .before-after-section {
        padding: 60px 0 80px;
      }
      .ba-slider-container {
        height: 560px;
      }
      .reviews-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 640px) {
      .hero-sheet { padding: 36px 20px; min-height: 480px; }
      .hero-bg { width: 100%; opacity: 0.35; }
      .hero-actions { flex-direction: column; }
      .btn-action-primary, .btn-action-secondary { width: 100%; justify-content: center; }
      .founder-sheet { grid-template-columns: 1fr; text-align: center; }
      .founder-img { margin: 0 auto; }
      .tilts-container { gap: 10px; }
      .tilt-card { width: 130px; }
      .ba-slider-container { height: 360px; }
    }
  `;
}
