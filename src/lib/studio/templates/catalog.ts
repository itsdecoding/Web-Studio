import { TemplateDefinition, TemplateId } from '../types';

export const TEMPLATES_CATALOG: Record<TemplateId, TemplateDefinition> = {
  'tactile-sheet': {
    id: 'tactile-sheet',
    name: 'Tactile Sheet & Modern Clinic',
    tagline: 'Soft sheet layers, clinical precision, and warm tactile cards.',
    category: 'Healthcare & Wellness',
    description: 'Engineered for modern dental clinics, private doctors, and medspas with a clean tactile card feel.',
    signatureLandmark: 'Floating bottom pill dock, horizontal touch-snap service rail, soft off-white card layers.',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', Inter, sans-serif",
    primaryColor: '#0F766E', // Modern medical teal
    accentColor: '#14B8A6',
    canvasBg: '#F8FAFC',
    cardBg: '#FFFFFF',
    textColor: '#0F172A',
    badgeBg: '#CCFBF1',
    previewThumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
  },

  'editorial-gazette': {
    id: 'editorial-gazette',
    name: 'Editorial Serif & Broadside',
    tagline: 'High-status serif typography, fine hairline borders, and prestigious broadside structure.',
    category: 'Professional & Legal',
    description: 'Perfect for law firms, private wealth consultants, luxury architects, and legacy practices.',
    signatureLandmark: 'Newsreader serif headlines, thin 1px borders, classical broadside 3-column card grid.',
    fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif",
    primaryColor: '#1E293B',
    accentColor: '#B45309', // Antique gold / amber
    canvasBg: '#FAF9F6',
    cardBg: '#FFFFFF',
    textColor: '#1C1917',
    badgeBg: '#FEF3C7',
    previewThumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
  },

  'industrial-heavy': {
    id: 'industrial-heavy',
    name: 'Industrial Heavy & Bold Trades',
    tagline: 'High-contrast black & amber, ultra-bold grotesk, and unapologetic authority.',
    category: 'Home Services & Contractors',
    description: 'Built for roofing contractors, HVAC specialists, electricians, and heavy industrial trades.',
    signatureLandmark: 'Heavy condensed typography, warning amber callouts, rugged geometric cards with zero radius.',
    fontFamily: "'Anton', 'Impact', -apple-system, sans-serif",
    primaryColor: '#F59E0B', // Safety amber / warning yellow
    accentColor: '#EA580C', // Safety orange
    canvasBg: '#0F1115',
    cardBg: '#181B22',
    textColor: '#F8FAFC',
    badgeBg: '#451A03',
    previewThumbnail: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=600&q=80',
  },

  'neo-obsidian': {
    id: 'neo-obsidian',
    name: 'Neo-Obsidian Bioluminescent Luxury',
    tagline: 'Pitch obsidian canvas, frosted glass blur, and emerald / azure halos.',
    category: 'Luxury & Aesthetics',
    description: 'Designed for high-end cosmetic clinics, luxury medspas, VIP nightlife, and aesthetic studios.',
    signatureLandmark: 'Frosted glassmorphism (backdrop-filter: 24px), bioluminescent edge glows, dark obsidian depth.',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif",
    primaryColor: '#10B981', // Bioluminescent emerald
    accentColor: '#06B6D4',
    canvasBg: '#05070A',
    cardBg: 'rgba(15, 23, 42, 0.75)',
    textColor: '#F1F5F9',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    previewThumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  },

  'minimalist-swiss': {
    id: 'minimalist-swiss',
    name: 'Swiss Typographic Minimalist',
    tagline: 'Generous whitespace, stark monochrome contrast, and pure asymmetric typography.',
    category: 'Creative & Boutique',
    description: 'Tailored for design studios, modern boutiques, premier architects, and contemporary venues.',
    signatureLandmark: 'Extreme whitespace ratios, asymmetrical column rhythms, stark black & white with zero decoration.',
    fontFamily: "'Space Grotesk', -apple-system, Helvetica, sans-serif",
    primaryColor: '#000000',
    accentColor: '#2563EB',
    canvasBg: '#FFFFFF',
    cardBg: '#F8F9FA',
    textColor: '#09090B',
    badgeBg: '#F1F5F9',
    previewThumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  },

  'electric-kinetic': {
    id: 'electric-kinetic',
    name: 'Electric Kinetic & Speed',
    tagline: 'High-velocity cyan glows, angled card cuts, and metric acceleration pills.',
    category: 'Automotive & Fitness',
    description: 'Engineered for auto detailing studios, performance vehicle tuning, and elite fitness gyms.',
    signatureLandmark: 'Diagonal badge slices, electric cyan/azure laser borders, performance metric stat bars.',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
    primaryColor: '#06B6D4', // Electric cyan
    accentColor: '#3B82F6',
    canvasBg: '#090D16',
    cardBg: '#101726',
    textColor: '#F8FAFC',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    previewThumbnail: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=600&q=80',
  },

  'warm-terracotta': {
    id: 'warm-terracotta',
    name: 'Warm Terracotta & Organic Hospitality',
    tagline: 'Warm baked clay, oatmeal canvas, and artisanal rounded curves.',
    category: 'Hospitality & Dining',
    description: 'Perfect for artisan cafes, sourdough bakeries, farm-to-table restaurants, and natural wellness.',
    signatureLandmark: 'Terracotta #C86D51 pill badges, warm oatmeal canvas #FBF8F3, friendly rounded card radiuses.',
    fontFamily: "'Fraunces', Georgia, serif",
    primaryColor: '#C86D51', // Warm baked clay
    accentColor: '#D97706',
    canvasBg: '#FAF7F2',
    cardBg: '#FFFFFF',
    textColor: '#292524',
    badgeBg: '#FFEDD5',
    previewThumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
  },

  'apex-authority': {
    id: 'apex-authority',
    name: 'Apex Authority & Enterprise B2B',
    tagline: 'Deep navy, bullion gold accents, verified trust crests, and corporate proof.',
    category: 'Corporate & Finance',
    description: 'Built for financial consulting, logistics, risk advisory, and high-trust corporate firms.',
    signatureLandmark: 'Regal navy #0A192F, bullion gold crests #D4AF37, verified corporate compliance proof bar.',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
    primaryColor: '#0F2744', // Deep regal navy
    accentColor: '#D4AF37', // Bullion gold
    canvasBg: '#F8FAFC',
    cardBg: '#FFFFFF',
    textColor: '#0A192F',
    badgeBg: '#FEF3C7',
    previewThumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },

  'emergency-dispatch': {
    id: 'emergency-dispatch',
    name: 'Emergency 24/7 Direct Dispatch',
    tagline: 'High-urgency callouts, live dispatch counter, and instant 1-tap dialer.',
    category: 'Emergency Services',
    description: 'Built for 24/7 plumbing, emergency towing, locksmiths, and urgent breakdown rescue.',
    signatureLandmark: 'Massive emergency banner, live "Average Response: 22 Mins" pulse dot, 1-tap instant call bar.',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Impact', sans-serif",
    primaryColor: '#DC2626', // Urgent signal red
    accentColor: '#F59E0B', // Caution amber
    canvasBg: '#0B0D11',
    cardBg: '#151921',
    textColor: '#FFFFFF',
    badgeBg: '#7F1D1D',
    previewThumbnail: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80',
  },

  'neighborhood-trust': {
    id: 'neighborhood-trust',
    name: 'Neighborhood Trust & Local Favorite',
    tagline: 'Prominent 5-star Google review hero, neighbor testimonials, and friendly warmth.',
    category: 'Local Community',
    description: 'Designed for hometown mechanics, family dental practices, daycare centers, and local legends.',
    signatureLandmark: 'Large 4.9+ Google rating badge with 200+ review counter, local neighborhood shoutout bar.',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif",
    primaryColor: '#2563EB', // Trust blue
    accentColor: '#F59E0B', // Star gold
    canvasBg: '#F8FAFC',
    cardBg: '#FFFFFF',
    textColor: '#1E293B',
    badgeBg: '#EFF6FF',
    previewThumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
  },
};

export function getTemplate(id: TemplateId): TemplateDefinition {
  return TEMPLATES_CATALOG[id] || TEMPLATES_CATALOG['tactile-sheet'];
}

export function listAllTemplates(): TemplateDefinition[] {
  return Object.values(TEMPLATES_CATALOG);
}
