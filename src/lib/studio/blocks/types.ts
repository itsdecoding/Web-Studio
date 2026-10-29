/**
 * Pinsite Web Studio: Block Engine Types & Contracts
 * Phase 5.1: Modular, Composable Section Blocks
 */

import { TemplateId, StudioImageSlot } from '../types';

export type BlockType =
  | 'top-bar'
  | 'nav'
  | 'hero'
  | 'philosophy-tilts'
  | 'before-after'
  | 'services-rail'
  | 'trust-pillars'
  | 'founder-spotlight'
  | 'google-reviews'
  | 'booking-intake'
  | 'sticky-callbar';

export interface BaseBlock {
  id: string;
  type: BlockType;
  enabled: boolean;
}

export interface TopBarBlock extends BaseBlock {
  type: 'top-bar';
  badgeText: string;
  businessName: string;
  city: string;
}

export interface NavBlock extends BaseBlock {
  type: 'nav';
  businessName: string;
  phone: string;
  ctaText?: string;
}

export interface HeroBlock extends BaseBlock {
  type: 'hero';
  badgeText: string;
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  heroImageUrl: string;
  phone: string;
  whatsappNumber: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
}

export interface PhilosophyTiltsBlock extends BaseBlock {
  type: 'philosophy-tilts';
  tagText: string;
  statementHtml: string;
  tilt1ImageUrl: string;
  tilt2ImageUrl: string;
}

export interface BeforeAfterBlock extends BaseBlock {
  type: 'before-after';
  tagText?: string;
  heading?: string;
  subheading?: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caseDescription?: string;
  ctaText?: string;
}

export interface ServiceCardData {
  title: string;
  description: string;
  image?: string;
  badge?: string;
  price?: string;
}

export interface ServicesRailBlock extends BaseBlock {
  type: 'services-rail';
  sectionTag: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  services: ServiceCardData[];
}

export interface PillarCardData {
  number: string;
  title: string;
  description: string;
}

export interface TrustPillarsBlock extends BaseBlock {
  type: 'trust-pillars';
  pillars: PillarCardData[];
}

export interface FounderSpotlightBlock extends BaseBlock {
  type: 'founder-spotlight';
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export interface ReviewItemData {
  author: string;
  roleOrLocation: string;
  quote: string;
  initials: string;
  stars?: number;
  dateText?: string;
}

export interface GoogleReviewsBlock extends BaseBlock {
  type: 'google-reviews';
  rating: number;
  reviewCount: number;
  reviews: ReviewItemData[];
}

export interface BookingIntakeBlock extends BaseBlock {
  type: 'booking-intake';
  heading?: string;
  subheading?: string;
  procedures: string[];
  businessName: string;
  whatsappNumber: string;
  phone: string;
  timingSlots?: string[];
}

export interface StickyCallbarBlock extends BaseBlock {
  type: 'sticky-callbar';
  phone: string;
  whatsappNumber: string;
  businessName: string;
}

export type WebsiteBlock =
  | TopBarBlock
  | NavBlock
  | HeroBlock
  | PhilosophyTiltsBlock
  | BeforeAfterBlock
  | ServicesRailBlock
  | TrustPillarsBlock
  | FounderSpotlightBlock
  | GoogleReviewsBlock
  | BookingIntakeBlock
  | StickyCallbarBlock;

export interface BlockThemeTokens {
  canvas: string;
  sheetBg: string;
  sheetText: string;
  paper: string;
  cardBg: string;
  text: string;
  textMuted: string;
  accent: string;
  accentGlow: string;
  mint: string;
  mintText: string;
  radiusSheet: string;
  radiusCard: string;
  fontSerif: string;
  fontSans: string;
}

export interface BlockRenderContext {
  theme: BlockThemeTokens;
  templateId: TemplateId;
  businessName: string;
  city: string;
  phone: string;
  whatsappNumber: string;
}
