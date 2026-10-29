/**
 * Pinsite Web Studio: Dual-Link Generation Engine
 * Orchestrates Gemini AI Copywriting, Curated Photo Vault,
 * Unique Vanity Slug, and Supabase Persistence in < 2 seconds.
 */

import { WebsiteProject, TemplateId } from './types';
import { generateAiWebsite, AiGeneratedSite } from './ai';
import { resolveVaultNiche } from './vault';
import { generateUniqueStudioSlug } from './slug';
import { saveProject } from './db';
import { generateDefaultBlocks } from './blocks/engine';

export interface GenerateSiteParams {
  businessName: string;
  niche?: string;
  city?: string;
  phone?: string;
  whatsappNumber?: string;
  address?: string;
  doctorOrOwnerName?: string;
  doctorOrOwnerTitle?: string;
  templateId?: TemplateId;
  customImages?: {
    hero?: string;
    founder?: string;
    facility?: string;
    tilt_1?: string;
    tilt_2?: string;
  };
}

export interface GenerateSiteResult {
  success: boolean;
  slug: string;
  public_url: string;
  editor_url: string;
  local_editor_url: string;
  businessName: string;
  niche: string;
  city: string;
  templateId: string;
  executionMs: number;
  project: WebsiteProject;
}

export async function generateWebsiteSite(params: GenerateSiteParams): Promise<GenerateSiteResult> {
  const startTime = Date.now();
  const businessName = params.businessName?.trim();
  if (!businessName) {
    throw new Error('businessName is required');
  }

  const niche = (params.niche || 'dental').toLowerCase();
  const city = params.city?.trim() || 'Pune';
  const vault = resolveVaultNiche(niche);

  // 1. Run Gemini AI Copywriter
  let ai: AiGeneratedSite;
  try {
    ai = await generateAiWebsite(businessName, niche, city);
  } catch (err) {
    console.warn('[Studio Generator] Gemini AI fallback activated:', err);
    ai = {
      tagline: `${businessName.toUpperCase()} • ELITE CARE`,
      headlineLine1: businessName.split(' ')[0].toUpperCase(),
      headlineLine2: businessName.split(' ').slice(1).join(' ').toUpperCase() || 'STUDIO',
      headlineEmphasis: 'PERFECTION',
      subheadline: `Specialized, high-precision procedures and patient-centered clinical care in ${city}.`,
      philosophyStatementHtml: `Modern diagnostics combined with <em>uncompromising attention to detail</em> for exceptional, lasting outcomes.`,
      doctorOrOwnerName: params.doctorOrOwnerName || 'Lead Specialist',
      doctorOrOwnerTitle: params.doctorOrOwnerTitle || 'Clinical Director',
      doctorBio: `Over 15 years of surgical and clinical excellence, focused on painless treatment and natural results.`,
      recommendedTemplateId: 'tactile-sheet',
      services: [
        { title: 'Specialist Consultation & 3D Imaging', description: 'Comprehensive diagnostic evaluation using high-resolution digital imaging.' },
        { title: 'Microscopic Precision Treatment', description: 'Advanced microscopic intervention preserving maximum healthy tissue.' },
        { title: 'Custom Aesthetic Restoration', description: 'Bespoke high-grade ceramic solutions designed to blend seamlessly.' },
        { title: 'Preventive Clinical Care', description: 'Structured maintenance protocols ensuring long-term health and stability.' },
      ],
      pillars: [
        { title: 'Sterilization Guarantee', description: 'Hospital-grade autoclaving and strict single-use instrumentation.' },
        { title: 'Transparent Costing', description: 'Itemized procedure quotes with zero hidden hospital or facility charges.' },
        { title: 'Zero Wait Times', description: 'Strict appointment scheduling respecting your personal schedule.' },
        { title: 'Lifelong Follow-up', description: 'Dedicated post-procedure checkups and ongoing preventive guidance.' },
      ],
      reviews: [
        { author: 'Rahul Deshmukh', roleOrLocation: city, quote: 'The level of professionalism and technology here is unmatched.', initials: 'RD' },
      ],
    };
  }

  // 2. Determine Template
  const templateId = (params.templateId || ai.recommendedTemplateId || 'tactile-sheet') as TemplateId;

  // 3. Generate Guaranteed Unique Vanity Slug
  const slug = await generateUniqueStudioSlug(businessName, city);

  // 4. Assemble Project Model
  const project: WebsiteProject = {
    businessName,
    niche,
    templateId,
    slug,
    headlineLine1: ai.headlineLine1 || businessName.toUpperCase(),
    headlineLine2: ai.headlineLine2 || '',
    subheadline: ai.subheadline || '',
    phone: params.phone || '+91 98765 43210',
    whatsappNumber: params.whatsappNumber || params.phone || '919876543210',
    city,
    address: params.address || `${city}, India`,
    doctorOrOwnerName: params.doctorOrOwnerName || ai.doctorOrOwnerName,
    doctorOrOwnerTitle: params.doctorOrOwnerTitle || ai.doctorOrOwnerTitle,
    rating: 4.9,
    reviewCount: 184,
    services: ai.services && ai.services.length > 0 ? ai.services : [],
    customImages: {
      hero: params.customImages?.hero || vault.hero,
      founder: params.customImages?.founder || vault.founder,
      facility: params.customImages?.facility || vault.facility,
      tilt_1: params.customImages?.tilt_1 || vault.tilts[0],
      tilt_2: params.customImages?.tilt_2 || vault.tilts[1],
    },
  };

  // Generate full modular block list tailored to the industry archetype
  project.blocks = generateDefaultBlocks(project, vault);

  // 5. Save to Supabase website_previews
  const saveResult = await saveProject(project);
  if (!saveResult.success) {
    throw new Error(`Failed to save project to Supabase: ${saveResult.error}`);
  }

  const executionMs = Date.now() - startTime;

  return {
    success: true,
    slug,
    public_url: `https://pinsite.pro/${slug}`,
    editor_url: `https://studio.pinsite.pro/builder?slug=${slug}`,
    local_editor_url: `http://localhost:3001/builder?slug=${slug}`,
    businessName,
    niche,
    city,
    templateId,
    executionMs,
    project,
  };
}
