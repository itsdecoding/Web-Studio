/**
 * Pinsite Web Studio: Master Modular Block Engine
 * Phase 5.3: Three Genuine Industry Archetypes (Clinical, Trades, Authority)
 */

import { WebsiteProject, TemplateDefinition, CompileHtmlResult } from '../types';
import { NicheVault } from '../types';
import {
  WebsiteBlock,
  BlockRenderContext,
  BlockThemeTokens,
  TopBarBlock,
  NavBlock,
  HeroBlock,
  TrackRecordBlock,
  PhilosophyTiltsBlock,
  BeforeAfterBlock,
  ServicesRailBlock,
  TrustPillarsBlock,
  FounderSpotlightBlock,
  GoogleReviewsBlock,
  BookingIntakeBlock,
  StickyCallbarBlock,
} from './types';
import { renderTopBarBlock } from './topbar';
import { renderNavBlock } from './nav';
import { renderHeroBlock } from './hero';
import { renderTrackRecordBlock } from './trackRecord';
import { renderPhilosophyTiltsBlock } from './tilts';
import { renderBeforeAfterBlock } from './beforeAfter';
import { renderServicesRailBlock } from './services';
import { renderTrustPillarsBlock } from './pillars';
import { renderFounderSpotlightBlock } from './founder';
import { renderGoogleReviewsBlock } from './reviews';
import { renderBookingIntakeBlock } from './booking';
import { renderStickyCallbarBlock } from './callbar';
import { generateMasterStyles } from './css';
import { escapeHtml } from './utils';
import { resolveArchetype, IndustryArchetype } from './archetypes';

export function renderBlock(block: WebsiteBlock, context: BlockRenderContext): string {
  if (block.enabled === false) {
    return '';
  }

  switch (block.type) {
    case 'top-bar':
      return renderTopBarBlock(block as TopBarBlock, context);
    case 'nav':
      return renderNavBlock(block as NavBlock, context);
    case 'hero':
      return renderHeroBlock(block as HeroBlock, context);
    case 'track-record':
      return renderTrackRecordBlock(block as TrackRecordBlock, context);
    case 'philosophy-tilts':
      return renderPhilosophyTiltsBlock(block as PhilosophyTiltsBlock, context);
    case 'before-after':
      return renderBeforeAfterBlock(block as BeforeAfterBlock, context);
    case 'services-rail':
      return renderServicesRailBlock(block as ServicesRailBlock, context);
    case 'trust-pillars':
      return renderTrustPillarsBlock(block as TrustPillarsBlock, context);
    case 'founder-spotlight':
      return renderFounderSpotlightBlock(block as FounderSpotlightBlock, context);
    case 'google-reviews':
      return renderGoogleReviewsBlock(block as GoogleReviewsBlock, context);
    case 'booking-intake':
      return renderBookingIntakeBlock(block as BookingIntakeBlock, context);
    case 'sticky-callbar':
      return renderStickyCallbarBlock(block as StickyCallbarBlock, context);
    default:
      console.warn(`[BlockEngine] Unknown block type: ${(block as any).type}`);
      return '';
  }
}

export function generateDefaultBlocks(project: WebsiteProject, vault: NicheVault): WebsiteBlock[] {
  const bizName = project.businessName || 'Elite Practice';
  const city = project.city || 'Pune';
  const phone = project.phone || '+91 98765 43210';
  const whatsapp = project.whatsappNumber || phone;
  const archetype: IndustryArchetype = resolveArchetype(project.niche);

  // Assets
  const heroImg = project.customImages?.hero || vault.hero;
  const tilt1Img = project.customImages?.tilt_1 || vault.tilts[0];
  const tilt2Img = project.customImages?.tilt_2 || vault.tilts[1];
  const founderImg = project.customImages?.founder || vault.founder;

  // -------------------------------------------------------------
  // ARCHETYPE 1: AUTHORITY & LEGAL ADVISORY (Law, Corporate, Wealth)
  // -------------------------------------------------------------
  if (archetype === 'authority') {
    return [
      {
        id: 'block-top-bar',
        type: 'top-bar',
        enabled: true,
        badgeText: 'Confidential Legal Counsel',
        businessName: bizName,
        city: `${city} • Bar Certified Counsel`,
      },
      {
        id: 'block-nav',
        type: 'nav',
        enabled: true,
        businessName: bizName,
        phone,
        ctaText: 'Confidential Consultation',
      },
      {
        id: 'block-hero',
        type: 'hero',
        enabled: true,
        badgeText: 'Trial-Tested Courtroom Advocacy',
        headlineLine1: project.headlineLine1 || 'UNCOMPROMISING',
        headlineLine2: project.headlineLine2 || 'TRIAL MASTERY',
        subheadline:
          project.subheadline ||
          'Elite courtroom litigation and high-stakes dispute resolution. Zero attorney fees unless we secure a substantial settlement or trial verdict for you.',
        heroImageUrl: heroImg,
        phone,
        whatsappNumber: whatsapp,
        primaryCtaText: `Call Counsel (${phone})`,
        secondaryCtaText: 'Confidential WhatsApp Review',
      },
      {
        id: 'block-track-record',
        type: 'track-record',
        enabled: true,
        headline: 'VERIFIED COURTROOM & SETTLEMENT RECORD',
        stats: [
          { value: '$140M+', label: 'Recovered For Clients', sublabel: 'Verdicts & Structured Settlements' },
          { value: '98.4%', label: 'Trial Win Rate', sublabel: 'State & Federal Jurisdictions' },
          { value: '25+ Yrs', label: 'Courtroom Trial Mastery', sublabel: 'Lead Trial Counsel' },
          { value: 'Zero Upfront', label: 'Contingency Fee Policy', sublabel: 'No Recovery, No Fee' },
        ],
      },
      {
        id: 'block-philosophy',
        type: 'philosophy-tilts',
        enabled: true,
        tagText: 'OUR LITIGATION CREED',
        statementHtml:
          'We do not accept cases to settle cheaply. Every brief is engineered with <em>uncompromising trial precision</em> from day one.',
        tilt1ImageUrl: tilt1Img,
        tilt2ImageUrl: tilt2Img,
      },
      {
        id: 'block-before-after',
        type: 'before-after',
        enabled: true,
        tagText: 'LANDMARK CASE STUDY',
        heading: 'Initial Insurer Offer vs. <em>Final Courtroom Verdict</em>',
        subheading:
          'Drag the slider to compare the initial lowball offer rejected by our partners versus the final court-ordered settlement.',
        beforeImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
        afterImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        beforeLabel: 'INSURER OFFER: $45,000',
        afterLabel: 'VERDICT WON: $2,850,000',
        caseDescription: 'Catastrophic Liability Trial • 8-Member Jury Verdict • Full Recovery Of Lifetime Medical & Pain Damages',
        ctaText: '⚖️ Submit Your Case For Review',
      },
      {
        id: 'block-services',
        type: 'services-rail',
        enabled: true,
        sectionTag: 'CORE PRACTICE AREAS',
        sectionTitle: 'High-Stakes <em>Litigation Dossiers</em>',
        services: [
          { title: 'Catastrophic Personal Injury', description: 'Trial litigation against major insurers for severe spinal and traumatic brain injuries.', badge: 'Primary' },
          { title: 'Commercial Contract Disputes', description: 'Representation in multi-million dollar breach of fiduciary duty and corporate actions.', badge: 'Corporate' },
          { title: 'White-Collar & Regulatory Defense', description: 'Discreet defense in corporate governance, fraud allegations, and regulatory audits.' },
          { title: 'Employment & Executive Severance', description: 'High-stakes executive contract negotiation and whistleblower retaliation claims.' },
        ],
      },
      {
        id: 'block-pillars',
        type: 'trust-pillars',
        enabled: true,
        pillars: [
          { number: '01', title: 'Contingency Fee Representation', description: 'You pay zero upfront fees. We fund 100% of trial discovery and expert witness costs.' },
          { number: '02', title: 'Trial-Ready Preparation', description: 'Every case is prepared as if going to verdict, forcing maximum insurer settlement leverage.' },
          { number: '03', title: 'Direct Partner-Level Counsel', description: 'Your file is handled directly by senior trial partners, not passed off to junior associates.' },
          { number: '04', title: 'Ironclad Privilege & Privacy', description: 'Absolute attorney-client confidentiality backed by fortified encrypted communications.' },
        ],
      },
      {
        id: 'block-founder',
        type: 'founder-spotlight',
        enabled: true,
        name: project.doctorOrOwnerName || 'Jonathan R. Sterling, Esq.',
        title: project.doctorOrOwnerTitle || 'Senior Managing Trial Partner • State Bar #48291',
        bio: `Over 24 years of trial courtroom mastery across ${city}. Member of the Million Dollar Advocates Forum and recognized by Super Lawyers for relentless advocacy in high-stakes litigation.`,
        imageUrl: founderImg,
      },
      {
        id: 'block-reviews',
        type: 'google-reviews',
        enabled: true,
        rating: project.rating || 4.9,
        reviewCount: project.reviewCount || 142,
        reviews: [
          {
            author: 'Robert Vance',
            roleOrLocation: city,
            initials: 'RV',
            quote: 'When the insurance company offered pennies, Mr. Sterling took them to trial and secured a life-changing verdict for our family.',
          },
          {
            author: 'Elena Rostova',
            roleOrLocation: city,
            initials: 'ER',
            quote: 'Masterful courtroom command. Their direct partner attention and strategic leverage were evident in every hearing.',
          },
          {
            author: 'Marcus Chen',
            roleOrLocation: city,
            initials: 'MC',
            quote: 'Highest degree of ethics, transparency, and preparation. Would not step into a courtroom with anyone else.',
          },
        ],
      },
      {
        id: 'block-booking',
        type: 'booking-intake',
        enabled: true,
        heading: 'Confidential Case Review & Evaluation',
        subheading: `Schedule a confidential evaluation directly with the senior trial partners at ${bizName}.`,
        procedures: [
          'Catastrophic Injury & Accidents',
          'Commercial Business Litigation',
          'Wrongful Death & Liability',
          'Executive Employment Dispute',
          'Insurance Bad Faith Claim',
          'General Civil Trial Defense',
        ],
        timingSlots: [
          'Immediate Emergency Call (Within 1 Hour)',
          'Morning Consultation (9:00 AM – 1:00 PM)',
          'Afternoon Consultation (1:00 PM – 5:00 PM)',
          'Weekend / Private Evening Review',
        ],
        businessName: bizName,
        whatsappNumber: whatsapp,
        phone,
      },
      {
        id: 'block-callbar',
        type: 'sticky-callbar',
        enabled: true,
        phone,
        whatsappNumber: whatsapp,
        businessName: bizName,
      },
    ];
  }

  // -------------------------------------------------------------
  // ARCHETYPE 2: HEAVY TRADES & EMERGENCY DISPATCH (Roofing, HVAC)
  // -------------------------------------------------------------
  if (archetype === 'trades') {
    return [
      {
        id: 'block-top-bar',
        type: 'top-bar',
        enabled: true,
        badgeText: 'Emergency Dispatch Active',
        businessName: bizName,
        city: `🟢 Crews On Standby • Same-Day Storm & Leak Response in ${city}`,
      },
      {
        id: 'block-nav',
        type: 'nav',
        enabled: true,
        businessName: bizName,
        phone,
        ctaText: 'Emergency Call (24/7)',
      },
      {
        id: 'block-hero',
        type: 'hero',
        enabled: true,
        badgeText: 'Class 4 Hail & Storm Certified',
        headlineLine1: project.headlineLine1 || 'ELEVATED',
        headlineLine2: project.headlineLine2 || 'ROOF DEFENSE',
        subheadline:
          project.subheadline ||
          'Permanent weatherproofing, Class-4 impact shingles, and heavy-gauge standing seam metal. Same-day emergency leak mitigation with direct insurance adjuster mediation.',
        heroImageUrl: heroImg,
        phone,
        whatsappNumber: whatsapp,
        primaryCtaText: `Emergency Dispatch (${phone})`,
        secondaryCtaText: 'Free Drone Inspection WhatsApp',
      },
      {
        id: 'block-philosophy',
        type: 'philosophy-tilts',
        enabled: true,
        tagText: 'OUR WORKMANSHIP DEFENSE',
        statementHtml:
          'Impact-rated architectural systems, Class 4 hail defense, and <em>lifetime craftsmanship guarantees</em>.',
        tilt1ImageUrl: tilt1Img,
        tilt2ImageUrl: tilt2Img,
      },
      {
        id: 'block-before-after',
        type: 'before-after',
        enabled: true,
        tagText: 'REAL ROOF RESTORATION CASE',
        heading: 'Inspect Severe Storm Damage vs. <em>Architectural Renewal</em>',
        subheading:
          'Drag the interactive slider to inspect hail rupture repairs, heavy-gauge valley flashing, and seamless finish.',
        beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
        afterImage: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80',
        beforeLabel: 'BEFORE: HAIL DAMAGE',
        afterLabel: 'AFTER: CLASS 4 RENEWAL',
        caseDescription: 'Class 4 Impact Resistance • Heavy-Gauge Valley Flashing • 50-Year Non-Prorated Warranty',
        ctaText: '📅 Request Free Drone Inspection',
      },
      {
        id: 'block-services',
        type: 'services-rail',
        enabled: true,
        sectionTag: 'CONTRACTOR SOLUTIONS',
        sectionTitle: 'Precision <em>Engineered Trade Systems</em>',
        services: [
          { title: 'Class 4 Hail Damage Shingles', description: 'Synthetic F-Wave and impact-resistant shingles engineered for severe freeze-thaw cycles.', badge: 'Most Popular' },
          { title: 'Standing Seam Metal Roofs', description: 'Concealed fastener heavy-gauge architectural metal engineered for 70+ year durability.', badge: 'Lifetime' },
          { title: 'Commercial Flat Roofing (TPO/EPDM)', description: 'Heat-welded single-ply membrane installation for complete zero-leak industrial protection.' },
          { title: 'Emergency Leak Dispatch & Tarping', description: 'Immediate 60-minute dispatch crews equipped for full water-tight mitigation.' },
        ],
      },
      {
        id: 'block-pillars',
        type: 'trust-pillars',
        enabled: true,
        pillars: [
          { number: '01', title: 'Class 4 Impact Certified', description: 'Engineered to withstand 2-inch hail strikes without shingle rupture or substrate damage.' },
          { number: '02', title: 'Zero-Mess Cleanup Guarantee', description: 'Magnetic nail sweeps and landscape protection protocols around your entire property perimeter.' },
          { number: '03', title: 'Direct Insurance Mediation', description: 'Itemized Xactimate estimates prepared directly for rapid adjuster sign-off with zero hassle.' },
          { number: '04', title: '50-Year Non-Prorated Warranty', description: 'Complete manufacturer-backed labor and material guarantees for total peace of mind.' },
        ],
      },
      {
        id: 'block-founder',
        type: 'founder-spotlight',
        enabled: true,
        name: project.doctorOrOwnerName || 'Marcus Vance',
        title: project.doctorOrOwnerTitle || 'Master Certified Roofing Contractor • License #ROOF-8912',
        bio: `Over 18 years leading commercial and residential roof restorations across ${city}. Built on relentless craftsmanship, transparent line-item estimates, and lasting structural integrity.`,
        imageUrl: founderImg,
      },
      {
        id: 'block-reviews',
        type: 'google-reviews',
        enabled: true,
        rating: project.rating || 4.9,
        reviewCount: project.reviewCount || 192,
        reviews: [
          {
            author: 'David Harrison',
            roleOrLocation: city,
            initials: 'DH',
            quote: 'Had major hail damage. Their crew completed the entire tear-off and replacement in 2 days. The magnetic sweep left zero nails on my driveway.',
          },
          {
            author: 'Sarah Jenkins',
            roleOrLocation: city,
            initials: 'SJ',
            quote: 'Handled the insurance claim completely. The new Class 4 shingles lowered my homeowner insurance premium by 22%.',
          },
          {
            author: 'Michael Torres',
            roleOrLocation: city,
            initials: 'MT',
            quote: 'Extremely professional, punctual, and zero surprise charges. The best contractor experience I have had in years.',
          },
        ],
      },
      {
        id: 'block-booking',
        type: 'booking-intake',
        enabled: true,
        heading: 'Fast-Track Roof Inspection & Quote',
        subheading: `Schedule your comprehensive attic and roof assessment with ${bizName}. Same-week priority dispatch.`,
        procedures: [
          'Class 4 Hail & Storm Inspection',
          'Full Shingle Roof Replacement',
          'Commercial Flat Roof (TPO/EPDM)',
          'Emergency Leak Mitigation',
          'Gutters & Valley Flashing',
          'Free Drone Assessment',
        ],
        timingSlots: [
          'Immediate Emergency Dispatch (Within 2 Hours)',
          'Morning Window (8:00 AM – 12:00 PM)',
          'Afternoon Window (12:00 PM – 4:00 PM)',
          'Weekend Free Inspection Slot',
        ],
        businessName: bizName,
        whatsappNumber: whatsapp,
        phone,
      },
      {
        id: 'block-callbar',
        type: 'sticky-callbar',
        enabled: true,
        phone,
        whatsappNumber: whatsapp,
        businessName: bizName,
      },
    ];
  }

  // -------------------------------------------------------------
  // ARCHETYPE 3: CLINICAL & AESTHETIC (Dental, MedSpa, Clinic)
  // -------------------------------------------------------------
  return [
    {
      id: 'block-top-bar',
      type: 'top-bar',
      enabled: true,
      badgeText: 'Pinsite Concept',
      businessName: bizName,
      city,
    },
    {
      id: 'block-nav',
      type: 'nav',
      enabled: true,
      businessName: bizName,
      phone,
      ctaText: 'Call Now',
    },
    {
      id: 'block-hero',
      type: 'hero',
      enabled: true,
      badgeText: 'Bespoke Clinical Concept',
      headlineLine1: project.headlineLine1 || bizName.toUpperCase(),
      headlineLine2: project.headlineLine2 || (project.niche ? project.niche.toUpperCase() : 'PREMIER CLINICAL CARE'),
      subheadline:
        project.subheadline ||
        'Single-sitting painless root canals, Zirconia ceramic crowns, and laser dentistry under strict hospital-grade sterilization.',
      heroImageUrl: heroImg,
      phone,
      whatsappNumber: whatsapp,
      primaryCtaText: `Call Practice (${phone})`,
      secondaryCtaText: 'WhatsApp Consultation',
    },
    {
      id: 'block-philosophy',
      type: 'philosophy-tilts',
      enabled: true,
      tagText: 'OUR CLINICAL STANDARD',
      statementHtml:
        'Microscopic precision, transparent pricing, and <em>patient-first care</em> tailored to every procedure.',
      tilt1ImageUrl: tilt1Img,
      tilt2ImageUrl: tilt2Img,
    },
    {
      id: 'block-before-after',
      type: 'before-after',
      enabled: true,
      tagText: 'CLINICAL TRANSFORMATION',
      heading: 'Clinical Case: <em>Microscopic Enamel Precision</em>',
      subheading:
        'Drag the interactive slider to inspect restorative craftsmanship, seam alignment, and natural finish.',
      beforeImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80',
      beforeLabel: 'BEFORE',
      afterLabel: 'AFTER',
      caseDescription: 'Single-Sitting Ceramic Restoration • CAD/CAM Precision Margins • Zero Enamel Damage',
      ctaText: '📅 Request 3D Evaluation & Quote',
    },
    {
      id: 'block-services',
      type: 'services-rail',
      enabled: true,
      sectionTag: 'SPECIALIZED TREATMENTS',
      sectionTitle: 'Comprehensive <em>Clinical Care</em>',
      services: [
        { title: 'Single-Sitting Root Canal', description: 'Magnified endodontic treatment with automated apex locators for gentle, painless preservation.', badge: 'Specialty' },
        { title: 'CAD/CAM Zirconia Crowns', description: 'Monolithic ceramic crowns milled with 20-micron digital precision for natural translucency.', badge: 'Popular' },
        { title: 'In-Office Laser Teeth Whitening', description: 'Non-invasive cold-light brightening delivering up to 8 shades in 45 minutes.' },
        { title: 'Computer-Guided Implants', description: 'CBCT 3D scanned titanium implants placed for lifelong chewing stability.' },
      ],
    },
    {
      id: 'block-pillars',
      type: 'trust-pillars',
      enabled: true,
      pillars: [
        { number: '01', title: 'Hospital-Grade Sterilization', description: 'Class B multi-stage autoclave sterilization protocols for 100% patient safety.' },
        { number: '02', title: 'Microscope-Guided Precision', description: 'Magnified clinical fields ensure microscopic accuracy and minimal discomfort.' },
        { number: '03', title: 'Zero-Wait Scheduling', description: 'Strictly timed appointments so you never spend hours waiting in reception.' },
        { number: '04', title: 'Transparent Treatment Plans', description: 'Complete upfront estimates with zero surprise fees or unneeded procedures.' },
      ],
    },
    {
      id: 'block-founder',
      type: 'founder-spotlight',
      enabled: true,
      name: project.doctorOrOwnerName || 'Dr. Amit Sharma',
      title: project.doctorOrOwnerTitle || 'Lead Implantologist & Dental Surgeon',
      bio: `Dedicated to bringing world-class diagnostics and clinical transparency to ${city}. Every patient receives personalized, gentle care designed for long-term health and confident smiles.`,
      imageUrl: founderImg,
    },
    {
      id: 'block-reviews',
      type: 'google-reviews',
      enabled: true,
      rating: project.rating || 4.9,
      reviewCount: project.reviewCount || 184,
      reviews: [
        {
          author: 'Pooja Kulkarni',
          roleOrLocation: city,
          initials: 'PK',
          quote: 'Completely painless root canal treatment. Dr. Sharma explained every step on the 3D scan before beginning.',
        },
        {
          author: 'Vikram Mehta',
          roleOrLocation: city,
          initials: 'VM',
          quote: 'Extremely transparent pricing with no hidden charges. The clinic feels like a premium private hospital.',
        },
        {
          author: 'Sneha Patil',
          roleOrLocation: city,
          initials: 'SP',
          quote: 'Zero waiting time. Was taken into the operatory right at my appointment slot. Highly recommended for families.',
        },
      ],
    },
    {
      id: 'block-booking',
      type: 'booking-intake',
      enabled: true,
      heading: 'Direct Clinical Booking & Inquiries',
      subheading: `Schedule your appointment directly with ${bizName}. Zero reception waiting times guaranteed.`,
      procedures: [
        'Single-Sitting Root Canal',
        'Zirconia Ceramic Crowns',
        'Laser Teeth Whitening',
        'Computer-Guided Dental Implants',
        'Clear Orthodontic Aligners',
        'Comprehensive Consultation',
      ],
      timingSlots: [
        'Morning (9:00 AM – 1:00 PM)',
        'Afternoon (1:00 PM – 5:00 PM)',
        'Evening (5:00 PM – 9:00 PM)',
        'Urgent Same-Day Walk-in',
      ],
      businessName: bizName,
      whatsappNumber: whatsapp,
      phone,
    },
    {
      id: 'block-callbar',
      type: 'sticky-callbar',
      enabled: true,
      phone,
      whatsappNumber: whatsapp,
      businessName: bizName,
    },
  ];
}

export function resolveThemeTokens(
  template: TemplateDefinition,
  primaryColorOverride?: string
): BlockThemeTokens {
  const isDark = ['industrial-heavy', 'neo-obsidian', 'electric-kinetic', 'emergency-dispatch'].includes(template.id);
  const primary = primaryColorOverride || template.primaryColor;

  return {
    canvas: isDark ? '#06080B' : '#ECECE8',
    sheetBg: isDark ? '#0C1017' : template.id === 'tactile-sheet' ? '#0F2922' : '#141412',
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
    fontSerif: "'Instrument Serif', Georgia, serif",
    fontSans: "'Plus Jakarta Sans', -apple-system, sans-serif",
  };
}

export function compileBlocksToHtml(
  blocks: WebsiteBlock[],
  project: WebsiteProject,
  themeTokens: BlockThemeTokens
): CompileHtmlResult {
  const start = performance.now();
  const bizName = project.businessName || 'Elite Practice';
  const city = project.city || 'Pune';
  const subhead = project.subheadline || 'Specialized care and clinical excellence.';

  const context: BlockRenderContext = {
    theme: themeTokens,
    templateId: project.templateId || 'tactile-sheet',
    businessName: bizName,
    city,
    phone: project.phone || '+91 98765 43210',
    whatsappNumber: project.whatsappNumber || project.phone || '919876543210',
  };

  const renderedBlocksHtml = blocks.map((b) => renderBlock(b, context)).join('\n');
  const css = generateMasterStyles(themeTokens);

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
${css}
  </style>
</head>
<body>
${renderedBlocksHtml}
</body>
</html>`;

  const executionMs = Math.round((performance.now() - start) * 100) / 100;

  return {
    html,
    templateId: project.templateId,
    executionMs,
  };
}
