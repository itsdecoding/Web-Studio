/**
 * Pinsite Web Studio: Core Types & Contracts
 * Phase 1: Universal Media & Image Hub
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
