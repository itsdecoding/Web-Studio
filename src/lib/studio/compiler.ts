/**
 * Pinsite Web Studio: Master $1,000 Architectural Website Compiler
 * Ported from the authentic, high-converting Joshi Dental Clinic design system.
 * Zero-scrollbar iframe rendering, layered tactile sheets, masked hero photography,
 * dual floating tilt cards, touch-snap treatment rail, and floating callbar.
 */

import { WebsiteProject, CompileHtmlResult } from './types';
import { getTemplate } from './templates/catalog';
import { resolveVaultNiche } from './vault';

export function compileWebsiteHtml(project: WebsiteProject): CompileHtmlResult {
  const start = performance.now();

  const template = getTemplate(project.templateId);
  const vault = resolveVaultNiche(project.niche || 'general');

  // Resolved Assets
  const heroImg = project.customImages?.hero || vault.hero;
  const tilt1Img = project.customImages?.tilt_1 || vault.tilts[0];
  const tilt2Img = project.customImages?.tilt_2 || vault.tilts[1];
  const founderImg = project.customImages?.founder || vault.founder;
  const facilityImg = project.customImages?.facility || vault.facility;

  // Resolved Content
  const bizName = project.businessName || 'Elite Practice';
  const head1 = project.headlineLine1 || bizName.toUpperCase();
  const head2 = project.headlineLine2 || (project.niche ? project.niche.toUpperCase() : 'PREMIER CLINICAL CARE');
  const subhead =
    project.subheadline ||
    'Single-sitting painless root canals, Zirconia ceramic crowns, and laser dentistry under strict hospital-grade sterilization.';
  const phone = project.phone || '+91 98765 43210';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const whatsapp = (project.whatsappNumber || phone).replace(/[^0-9]/g, '');
  const city = project.city || 'Hadapsar, Pune';
  const address = project.address || `${city} • Landmark Tower, 2nd Floor`;
  const founderName = project.doctorOrOwnerName || 'Dr. Amit Sharma';
  const founderTitle = project.doctorOrOwnerTitle || 'Lead Implantologist & Dental Surgeon';

  // Resolved Services
  const services =
    project.services && project.services.length > 0
      ? project.services
      : vault.services.map((s) => ({
          title: s.title,
          description: s.description,
          image: s.image,
          badge: 'Specialty',
        }));

  // Style Tokens & Color Architecture
  const isDark = ['industrial-heavy', 'neo-obsidian', 'electric-kinetic', 'emergency-dispatch'].includes(template.id);
  const primary = project.primaryColorOverride || template.primaryColor;

  // Dynamic Theme Colors
  const theme = {
    canvas: isDark ? '#06080B' : '#ECECE8',
    sheetBg: isDark ? '#0C1017' : (template.id === 'tactile-sheet' ? '#0F2922' : '#141412'),
    sheetText: '#FFFFFF',
    paper: isDark ? '#11151E' : '#FAFAF8',
    cardBg: isDark ? '#161B26' : '#FFFFFF',
    text: isDark ? '#F1F5F9' : '#141412',
    textMuted: isDark ? '#94A3B8' : '#64748B',
    accent: primary,
    accentGlow: isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(249, 87, 33, 0.25)',
    mint: isDark ? '#064E3B' : '#E6F4EA',
    mintText: isDark ? '#6EE7B7' : '#0F766E',
    radiusSheet: '28px',
    radiusCard: '20px',
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${escapeHtml(bizName)} • ${escapeHtml(city)}</title>
  <meta name="description" content="${escapeHtml(subhead)}">
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&family=Anton&display=swap" rel="stylesheet">
  
  <style>
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
      --serif: 'Instrument Serif', Georgia, serif;
      --sans: 'Plus Jakarta Sans', -apple-system, sans-serif;
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
      max-width: 1120px;
      margin: 0 auto;
      padding: 0 20px;
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
      background: rgba(255, 255, 255, 0.85);
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
      min-height: 580px;
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
      background: url("${escapeHtml(heroImg)}") 50% 30%/cover no-repeat;
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
      flex: 0 0 270px;
      border-radius: var(--r-card);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 10px 10px 18px;
      display: flex;
      flex-direction: column;
    }
    .treatment-card img {
      width: 100%;
      height: 150px;
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
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px;
      padding: 40px 0;
    }
    .pillar-card {
      background: var(--paper);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: var(--r-card);
      padding: 22px;
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
    }
    .callbar-phone {
      background: var(--accent);
      color: #FFFFFF;
    }
    .callbar-wa {
      background: #25D366;
      color: #FFFFFF;
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
    }
  </style>
</head>
<body>

  <!-- Top Pinsite Bar -->
  <div class="pinsite-bar">
    <div style="display:flex; align-items:center; gap:8px;">
      <span class="pinsite-pill">Pinsite Concept</span>
      <span style="color:#FFFFFF; font-weight:600;">${escapeHtml(bizName)}</span>
    </div>
    <div>${escapeHtml(city)}</div>
  </div>

  <!-- Floating Nav -->
  <div class="wrap nav">
    <div class="nav-inner">
      <div class="brand">
        <span class="brand-dot"></span>
        <span>${escapeHtml(bizName)}</span>
      </div>
      <a href="tel:${cleanPhone}" class="nav-call">
        <span>📞</span>
        <span>Call Now</span>
      </a>
    </div>
  </div>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-sheet">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <span>✨</span>
          <span>Bespoke Clinical Concept</span>
        </div>
        <h1 class="hero-title">
          ${escapeHtml(head1)}
          <em>${escapeHtml(head2)}</em>
        </h1>
        <p class="hero-subhead">${escapeHtml(subhead)}</p>
        <div class="hero-actions">
          <a href="tel:${cleanPhone}" class="btn-action-primary">
            <span>📞 Call Clinic (${escapeHtml(phone)})</span>
          </a>
          <a href="https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi ${bizName}, I would like to schedule an appointment.`)}" target="_blank" class="btn-action-secondary">
            <span>💬 WhatsApp Consultation</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Philosophy & Dual Tilt Feature -->
  <section class="wrap philosophy">
    <div class="philosophy-tag">OUR CLINICAL STANDARD</div>
    <h2 class="philosophy-statement">
      Microscopic precision, transparent pricing, and <em>patient-first care</em> tailored to every procedure.
    </h2>

    <div class="tilts-container">
      <div class="tilt-card tilt-left">
        <img src="${escapeHtml(tilt1Img)}" alt="Facility Photo" loading="lazy">
      </div>
      <div class="tilt-card tilt-right">
        <img src="${escapeHtml(tilt2Img)}" alt="Clinical Standard" loading="lazy">
      </div>
    </div>
  </section>

  <!-- Horizontal Touch-Snap Treatment Rail -->
  <section class="services-sheet">
    <div class="services-head">
      <div style="font-size:11px; text-transform:uppercase; font-weight:800; letter-spacing:1px; color:#A7F3D0; margin-bottom:4px;">
        SPECIALIZED TREATMENTS
      </div>
      <h2>Comprehensive <em>Clinical Care</em></h2>
    </div>

    <div class="rail">
      ${services.map((s, idx) => `
        <article class="treatment-card">
          <img src="${escapeHtml(s.image || tilt2Img)}" alt="${escapeHtml(s.title)}" loading="lazy">
          <h4>${escapeHtml(s.title)}</h4>
          <p>${escapeHtml(s.description || 'Specialized procedure backed by modern diagnostic standards.')}</p>
        </article>
      `).join('')}
    </div>
  </section>

  <!-- 4 Value Pillars -->
  <section class="wrap">
    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-icon">01</div>
        <h4>Hospital-Grade Sterilization</h4>
        <p>Class B multi-stage autoclave sterilization protocols for 100% patient safety.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">02</div>
        <h4>Microscope-Guided Precision</h4>
        <p>Magnified clinical fields ensure microscopic accuracy and minimal discomfort.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">03</div>
        <h4>Zero-Wait Scheduling</h4>
        <p>Strictly timed appointments so you never spend hours waiting in reception.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">04</div>
        <h4>Transparent Treatment Plans</h4>
        <p>Complete upfront estimates with zero surprise fees or unneeded procedures.</p>
      </div>
    </div>

    <!-- Doctor / Founder Spotlight -->
    <div class="founder-sheet">
      <img src="${escapeHtml(founderImg)}" alt="${escapeHtml(founderName)}" class="founder-img" loading="lazy">
      <div>
        <h3 class="founder-name">${escapeHtml(founderName)}</h3>
        <div class="founder-title">${escapeHtml(founderTitle)}</div>
        <p class="founder-bio">
          Dedicated to bringing world-class diagnostics and clinical transparency to ${escapeHtml(city)}. Every patient receives personalized, gentle care designed for long-term health and confident smiles.
        </p>
      </div>
    </div>
  </section>

  <!-- Sticky Bottom Conversion Dock -->
  <div class="callbar">
    <a href="tel:${cleanPhone}" class="callbar-btn callbar-phone">
      <span>📞 Call Now</span>
    </a>
    <a href="https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi ${bizName}, I would like to schedule an appointment.`)}" target="_blank" class="callbar-btn callbar-wa">
      <span>💬 WhatsApp</span>
    </a>
  </div>

</body>
</html>`;

  const executionMs = Math.round((performance.now() - start) * 100) / 100;
  return {
    html,
    templateId: template.id,
    executionMs,
  };
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
