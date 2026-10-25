/**
 * Pinsite Web Studio: Master Modular Block Engine
 * Phase 5.1: Composable Section Block Architecture
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
  PhilosophyTiltsBlock,
  ServicesRailBlock,
  TrustPillarsBlock,
  FounderSpotlightBlock,
  GoogleReviewsBlock,
  StickyCallbarBlock,
} from './types';
import { renderTopBarBlock } from './topbar';
import { renderNavBlock } from './nav';
import { renderHeroBlock } from './hero';
import { renderPhilosophyTiltsBlock } from './tilts';
import { renderServicesRailBlock } from './services';
import { renderTrustPillarsBlock } from './pillars';
import { renderFounderSpotlightBlock } from './founder';
import { renderGoogleReviewsBlock } from './reviews';
import { renderStickyCallbarBlock } from './callbar';
import { generateMasterStyles } from './css';
import { escapeHtml } from './utils';

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
    case 'philosophy-tilts':
      return renderPhilosophyTiltsBlock(block as PhilosophyTiltsBlock, context);
    case 'services-rail':
      return renderServicesRailBlock(block as ServicesRailBlock, context);
    case 'trust-pillars':
      return renderTrustPillarsBlock(block as TrustPillarsBlock, context);
    case 'founder-spotlight':
      return renderFounderSpotlightBlock(block as FounderSpotlightBlock, context);
    case 'google-reviews':
      return renderGoogleReviewsBlock(block as GoogleReviewsBlock, context);
    case 'sticky-callbar':
      return renderStickyCallbarBlock(block as StickyCallbarBlock, context);
    default:
      console.warn(`[BlockEngine] Unknown block type: ${(block as any).type}`);
      return '';
  }
}

export function generateDefaultBlocks(project: WebsiteProject, vault: NicheVault): WebsiteBlock[] {
  const bizName = project.businessName || 'Elite Practice';
  const city = project.city || 'Hadapsar, Pune';
  const phone = project.phone || '+91 98765 43210';
  const whatsapp = project.whatsappNumber || phone;

  // Assets
  const heroImg = project.customImages?.hero || vault.hero;
  const tilt1Img = project.customImages?.tilt_1 || vault.tilts[0];
  const tilt2Img = project.customImages?.tilt_2 || vault.tilts[1];
  const founderImg = project.customImages?.founder || vault.founder;

  // Services
  const services =
    project.services && project.services.length > 0
      ? project.services.map((s) => ({
          title: s.title,
          description: s.description || 'Specialized procedure backed by modern diagnostic standards.',
          image: s.image || tilt2Img,
          badge: s.badge || 'Specialty',
          price: s.price,
        }))
      : vault.services.map((s) => ({
          title: s.title,
          description: s.description || 'Specialized clinical care tailored to your exact needs.',
          image: s.image,
          badge: 'Specialty',
        }));

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
      id: 'block-services',
      type: 'services-rail',
      enabled: true,
      sectionTag: 'SPECIALIZED TREATMENTS',
      sectionTitle: 'Comprehensive <em>Clinical Care</em>',
      services,
    },
    {
      id: 'block-pillars',
      type: 'trust-pillars',
      enabled: true,
      pillars: [
        {
          number: '01',
          title: 'Hospital-Grade Sterilization',
          description: 'Class B multi-stage autoclave sterilization protocols for 100% patient safety.',
        },
        {
          number: '02',
          title: 'Microscope-Guided Precision',
          description: 'Magnified clinical fields ensure microscopic accuracy and minimal discomfort.',
        },
        {
          number: '03',
          title: 'Zero-Wait Scheduling',
          description: 'Strictly timed appointments so you never spend hours waiting in reception.',
        },
        {
          number: '04',
          title: 'Transparent Treatment Plans',
          description: 'Complete upfront estimates with zero surprise fees or unneeded procedures.',
        },
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
          quote:
            'Completely painless root canal treatment. Dr. Sharma explained every step on the 3D scan before beginning.',
        },
        {
          author: 'Vikram Mehta',
          roleOrLocation: city,
          initials: 'VM',
          quote:
            'Extremely transparent pricing with no hidden charges. The clinic feels like a premium private hospital.',
        },
        {
          author: 'Sneha Patil',
          roleOrLocation: city,
          initials: 'SP',
          quote:
            'Zero waiting time. Was taken into the operatory right at my appointment slot. Highly recommended for families.',
        },
      ],
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
  const city = project.city || 'Hadapsar, Pune';
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
