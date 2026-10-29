/**
 * Pinsite Web Studio: Industry Archetypes Definition
 * Phase 5.3: Three Genuine Structural Architectures (Not Palette Swaps)
 */

export type IndustryArchetype = 'clinical' | 'trades' | 'authority';

export interface ArchetypeMeta {
  id: IndustryArchetype;
  name: string;
  category: string;
  tagline: string;
  defaultTemplateId: string;
  niches: string[];
}

export const ARCHETYPES: Record<IndustryArchetype, ArchetypeMeta> = {
  clinical: {
    id: 'clinical',
    name: 'Clinical & Aesthetic',
    category: 'Healthcare & Wellness',
    tagline: 'Split-hero with lead doctor portrait, microscopic precision, and before/after transformation.',
    defaultTemplateId: 'tactile-sheet',
    niches: ['dental', 'medical', 'medspa', 'orthodontics', 'plastic-surgery', 'clinic', 'dentist'],
  },
  trades: {
    id: 'trades',
    name: 'Heavy Trades & Emergency Dispatch',
    category: 'Home Services & Contractors',
    tagline: 'High-urgency emergency warning bar, Class 4 hail impact proof, and instant drone roof estimate.',
    defaultTemplateId: 'industrial-heavy',
    niches: ['roofing', 'hvac', 'plumbing', 'solar', 'auto', 'contractor', 'electrician'],
  },
  authority: {
    id: 'authority',
    name: 'Authority & Legal Advisory',
    category: 'Professional & Legal',
    tagline: 'High-status editorial broadside, multi-million dollar settlement ticker, and confidential review.',
    defaultTemplateId: 'editorial-gazette',
    niches: ['law', 'legal', 'lawyer', 'attorney', 'real-estate', 'wealth', 'consulting'],
  },
};

export function resolveArchetype(niche: string | undefined): IndustryArchetype {
  if (!niche) return 'clinical';
  const clean = niche.toLowerCase().trim();

  for (const [key, arch] of Object.entries(ARCHETYPES)) {
    if (arch.niches.some((n) => clean.includes(n))) {
      return key as IndustryArchetype;
    }
  }

  return 'clinical';
}
