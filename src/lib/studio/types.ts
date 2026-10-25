/**
 * Pinsite Web Studio: Core Types & Contracts
 * Phase 1: Universal Media & Image Hub
 * Phase 2: 10 Architectural Design Styles Engine
 */

export type StudioImageSlot =
  | 'hero'
  | 'tilt_1'
  | 'tilt_2'
  | 'service'
  | 'founder'
  | 'facility'
  | 'gallery';

export interface StudioImageItem {
  id: string;
  url: string;
  slot: StudioImageSlot;
  title?: string;
  caption?: string;
  source: 'upload' | 'url' | 'vault';
  niche?: string;
  width?: number;
  height?: number;
}

export interface NicheVaultService {
  title: string;
  image: string;
  description?: string;
}

export interface NicheVault {
  id: string;
  name: string;
  category: string;
  description: string;
  hero: string;
  tilts: [string, string];
  services: NicheVaultService[];
  founder: string;
  facility: string;
  gallery: string[];
}

export interface UploadImageResult {
  success: boolean;
  url?: string;
  error?: string;
  fileName?: string;
  mimeType?: string;
  sizeBytes?: number;
  source: 'upload' | 'url';
}

export interface ValidateUrlResult {
  valid: boolean;
  url?: string;
  error?: string;
  contentType?: string;
}

// -------------------------------------------------------------
// Phase 2: Design Styles & Website Project Contracts
// -------------------------------------------------------------

export type TemplateId =
  | 'tactile-sheet'
  | 'editorial-gazette'
  | 'industrial-heavy'
  | 'neo-obsidian'
  | 'minimalist-swiss'
  | 'electric-kinetic'
  | 'warm-terracotta'
  | 'apex-authority'
  | 'emergency-dispatch'
  | 'neighborhood-trust';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  tagline: string;
  category: string;
  description: string;
  signatureLandmark: string;
  fontFamily: string;
  primaryColor: string;
  accentColor: string;
  canvasBg: string;
  cardBg: string;
  textColor: string;
  badgeBg: string;
  previewThumbnail: string;
}

export interface ProjectServiceItem {
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  price?: string;
}

export interface WebsiteProject {
  id?: string;
  businessName: string;
  niche: string;
  templateId: TemplateId;
  phone?: string;
  whatsappNumber?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subheadline?: string;
  city?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
  services?: ProjectServiceItem[];
  doctorOrOwnerName?: string;
  doctorOrOwnerTitle?: string;
  trustBadges?: string[];
  customImages?: Partial<Record<StudioImageSlot, string>>;
  primaryColorOverride?: string;
  slug?: string;
  blocks?: any[];
}

export interface CompileHtmlResult {
  html: string;
  templateId: TemplateId;
  executionMs: number;
}
