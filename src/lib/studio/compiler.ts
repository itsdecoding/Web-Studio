/**
 * Pinsite Web Studio: Master Multi-Template HTML Compiler
 * Phase 2: Compiles production-ready, ultra-responsive HTML across 10 architectural styles
 */

import { WebsiteProject, CompileHtmlResult, TemplateId } from './types';
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
  const bizName = project.businessName || 'Elite Local Practice';
  const head1 = project.headlineLine1 || bizName.toUpperCase();
  const head2 = project.headlineLine2 || (project.niche ? project.niche.toUpperCase() : 'PREMIER CLINICAL CARE');
  const subhead = project.subheadline || vault.description;
  const phone = project.phone || '+91 98765 43210';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const whatsapp = (project.whatsappNumber || phone).replace(/[^0-9]/g, '');
  const rating = project.rating || 4.9;
  const reviewCount = project.reviewCount || 192;
  const city = project.city || 'Hadapsar, Pune';
  const address = project.address || `${city} • Landmark Tower, 2nd Floor`;
  const founderName = project.doctorOrOwnerName || 'Dr. Director & Clinical Team';
  const founderTitle = project.doctorOrOwnerTitle || 'Lead Practitioner & Practice Founder';

  // Resolved Services
  const services = (project.services && project.services.length > 0)
    ? project.services
    : vault.services.map((s) => ({
        title: s.title,
        description: s.description,
        image: s.image,
        badge: 'Recommended',
      }));

  // Style Tokens
  const isDark = ['industrial-heavy', 'neo-obsidian', 'electric-kinetic', 'emergency-dispatch'].includes(template.id);
  const primary = project.primaryColorOverride || template.primaryColor;
  const accent = template.accentColor;
  const canvasBg = template.canvasBg;
  const cardBg = template.cardBg;
  const textCol = template.textColor;
  const fontFam = template.fontFamily;
  const isSerif = template.id === 'editorial-gazette' || template.id === 'warm-terracotta';
  const cardRadius = template.id === 'industrial-heavy' ? '0px' : (template.id === 'warm-terracotta' ? '24px' : '16px');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${escapeHtml(bizName)} • Official Website</title>
  <meta name="description" content="${escapeHtml(subhead)}">
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@500;700&family=Newsreader:ital,wght@0,400;0,600;0,700;1,400&family=Anton&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --primary: ${primary};
      --accent: ${accent};
      --canvas: ${canvasBg};
      --card-bg: ${cardBg};
      --text: ${textCol};
      --text-muted: ${isDark ? '#94A3B8' : '#64748B'};
      --border: ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
      --radius: ${cardRadius};
      --font-main: ${fontFam};
      --shadow: ${isDark ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '0 10px 30px rgba(0, 0, 0, 0.04)'};
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--canvas);
      color: var(--text);
      font-family: var(--font-main);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      padding-bottom: 90px;
    }

    a { text-decoration: none; color: inherit; }
    img { max-width: 100%; height: auto; display: block; object-fit: cover; }

    /* Layout Containers */
    .wrap {
      max-width: 1080px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Top Pinsite Studio Banner */
    .pinsite-bar {
      background: ${isDark ? '#080B10' : '#111827'};
      color: #94A3B8;
      font-size: 11px;
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      font-family: -apple-system, sans-serif;
    }
    .pinsite-pill {
      background: rgba(249, 87, 33, 0.2);
      color: #FF8A50;
      padding: 2px 8px;
      border-radius: 99px;
      font-weight: 600;
      font-size: 10px;
      letter-spacing: 0.5px;
    }

    /* Header Nav */
    header {
      padding: 18px 0;
      border-bottom: 1px solid var(--border);
    }
    .nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-title {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--primary);
      display: inline-block;
    }
    .nav-call-btn {
      background: var(--primary);
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: var(--radius);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* Hero Section */
    .hero {
      padding: 40px 0 30px;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: ${template.badgeBg};
      color: ${primary};
      font-size: 12px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 99px;
      margin-bottom: 16px;
      border: 1px solid var(--border);
    }
    .hero-title {
      font-size: clamp(32px, 7vw, 56px);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -1.5px;
      margin-bottom: 14px;
      ${isSerif ? "font-family: 'Newsreader', serif; font-weight: 600;" : ''}
    }
    .hero-title span {
      color: var(--primary);
      display: block;
    }
    .hero-subhead {
      font-size: 15px;
      color: var(--text-muted);
      max-width: 580px;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 32px;
    }
    .btn-main {
      background: var(--primary);
      color: #FFFFFF;
      font-weight: 700;
      font-size: 14px;
      padding: 14px 28px;
      border-radius: var(--radius);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    }
    .btn-sec {
      background: var(--card-bg);
      color: var(--text);
      font-weight: 700;
      font-size: 14px;
      padding: 14px 24px;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    /* Trust Proof Bar */
    .proof-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
      padding: 16px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      margin-bottom: 40px;
    }
    .proof-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
    }
    .stars { color: #F59E0B; }

    /* Visual Tilt Images */
    .visual-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 16px;
      margin-bottom: 48px;
    }
    .visual-box {
      border-radius: var(--radius);
      overflow: hidden;
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      background: var(--card-bg);
      position: relative;
    }
    .visual-box img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .visual-box:hover img {
      transform: scale(1.03);
    }
    .visual-caption {
      position: absolute;
      bottom: 12px;
      left: 12px;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      color: #FFFFFF;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }

    /* Services Rail / Grid */
    .section-head {
      margin-bottom: 24px;
    }
    .section-tag {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 4px;
    }
    .section-title {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 48px;
    }
    .service-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
    }
    .service-card img {
      height: 160px;
      width: 100%;
      object-fit: cover;
    }
    .service-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .service-card h4 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .service-card p {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 12px;
      flex: 1;
    }
    .service-link {
      color: var(--primary);
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    /* Founder Spotlight */
    .founder-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 20px;
      align-items: center;
      margin-bottom: 48px;
      box-shadow: var(--shadow);
    }
    .founder-avatar {
      width: 140px;
      height: 140px;
      border-radius: var(--radius);
      object-fit: cover;
      border: 2px solid var(--primary);
    }
    .founder-name {
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 2px;
    }
    .founder-title {
      font-size: 13px;
      color: var(--primary);
      font-weight: 600;
      margin-bottom: 10px;
    }
    .founder-bio {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* Fixed Bottom Action Dock (.callbar) */
    .callbar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: ${isDark ? 'rgba(11, 13, 17, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
      backdrop-filter: blur(16px);
      border-top: 1px solid var(--border);
      padding: 12px 16px;
      display: flex;
      gap: 10px;
      z-index: 1000;
    }
    .callbar-btn {
      flex: 1;
      padding: 14px;
      border-radius: var(--radius);
      font-weight: 700;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-align: center;
    }
    .callbar-phone {
      background: var(--primary);
      color: #FFFFFF;
    }
    .callbar-wa {
      background: #25D366;
      color: #FFFFFF;
    }

    @media (max-width: 640px) {
      .visual-grid { grid-template-columns: 1fr; }
      .founder-card { grid-template-columns: 1fr; text-align: center; }
      .founder-avatar { margin: 0 auto; }
      .hero-title { font-size: 34px; }
      .hero-actions { flex-direction: column; }
      .btn-main, .btn-sec { width: 100%; justify-content: center; }
    }
  </style>
</head>
<body>

  <!-- Pinsite Concept Banner -->
  <div class="pinsite-bar">
    <div style="display:flex; align-items:center; gap:8px;">
      <span class="pinsite-pill">PINSITE CONCEPT</span>
      <span>${escapeHtml(bizName)}</span>
    </div>
    <div>${escapeHtml(city)}</div>
  </div>

  <!-- Header -->
  <header>
    <div class="wrap nav-inner">
      <div class="brand-title">
        <span class="brand-dot"></span>
        <span>${escapeHtml(bizName)}</span>
      </div>
      <a href="tel:${cleanPhone}" class="nav-call-btn">
        <span>📞</span>
        <span>Call Now</span>
      </a>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="wrap">
      <div class="hero-badge">
        <span>✨</span>
        <span>${escapeHtml(template.name)} Style</span>
      </div>
      <h1 class="hero-title">
        ${escapeHtml(head1)}
        <span>${escapeHtml(head2)}</span>
      </h1>
      <p class="hero-subhead">${escapeHtml(subhead)}</p>
      
      <div class="hero-actions">
        <a href="tel:${cleanPhone}" class="btn-main">
          <span>📞 Call Practice (${escapeHtml(phone)})</span>
        </a>
        <a href="https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi ${bizName}, I would like to book a consultation.`)}" target="_blank" class="btn-sec">
          <span>💬 WhatsApp Chat</span>
        </a>
      </div>

      <!-- Proof Bar -->
      <div class="proof-bar">
        <div class="proof-item">
          <span class="stars">★★★★★</span>
          <span>${rating} Rating (${reviewCount}+ Verified Reviews)</span>
        </div>
        <div class="proof-item">
          <span>📍</span>
          <span>${escapeHtml(address)}</span>
        </div>
      </div>

      <!-- Visual Showcase Rail -->
      <div class="visual-grid">
        <div class="visual-box">
          <img src="${escapeHtml(heroImg)}" alt="${escapeHtml(bizName)} Facility" loading="eager">
          <div class="visual-caption">Verified Facility & Equipment</div>
        </div>
        <div class="visual-box">
          <img src="${escapeHtml(tilt1Img)}" alt="${escapeHtml(bizName)} Treatment" loading="lazy">
          <div class="visual-caption">Standard of Excellence</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Grid -->
  <section class="wrap">
    <div class="section-head">
      <div class="section-tag">OUR SPECIALTIES & TREATMENTS</div>
      <h2 class="section-title">Comprehensive Clinical Care</h2>
    </div>

    <div class="services-grid">
      ${services.map((s) => `
        <div class="service-card">
          <img src="${escapeHtml(s.image || tilt2Img)}" alt="${escapeHtml(s.title)}" loading="lazy">
          <div class="service-body">
            <h4>${escapeHtml(s.title)}</h4>
            <p>${escapeHtml(s.description || 'Dedicated specialist care backed by state-of-the-art clinical protocol.')}</p>
            <a href="tel:${cleanPhone}" class="service-link">
              <span>Book Appointment &rarr;</span>
            </a>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Founder Spotlight -->
    <div class="founder-card">
      <img src="${escapeHtml(founderImg)}" alt="${escapeHtml(founderName)}" class="founder-avatar" loading="lazy">
      <div>
        <h3 class="founder-name">${escapeHtml(founderName)}</h3>
        <div class="founder-title">${escapeHtml(founderTitle)}</div>
        <p class="founder-bio">
          Dedicated to providing patient-first healthcare with transparent pricing, microscopic accuracy, and a gentle touch. Every procedure is custom-planned to guarantee lasting comfort and natural clinical outcomes.
        </p>
      </div>
    </div>
  </section>

  <!-- Floating Sticky Call Bar -->
  <div class="callbar">
    <a href="tel:${cleanPhone}" class="callbar-btn callbar-phone">
      <span>📞 Call Now</span>
    </a>
    <a href="https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi ${bizName}, I would like to book an appointment.`)}" target="_blank" class="callbar-btn callbar-wa">
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
