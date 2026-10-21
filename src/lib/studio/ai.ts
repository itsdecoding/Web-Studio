/**
 * Pinsite Web Studio: Gemini AI Creative Director Engine
 * Anti-Fluff, Hyper-Localized, $1,000 Bespoke Copywriting
 */

import { WebsiteProject, TemplateId, ProjectServiceItem } from './types';

const CANDIDATE_MODELS = [
  'gemini-3.5-flash',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
];

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('Missing GEMINI_API_KEY in environment variables');
  }
  return key;
}

export interface AiGeneratedSite {
  tagline: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineEmphasis: string;
  subheadline: string;
  philosophyStatementHtml: string;
  services: ProjectServiceItem[];
  pillars: Array<{ title: string; description: string }>;
  doctorOrOwnerName: string;
  doctorOrOwnerTitle: string;
  doctorBio: string;
  reviews: Array<{ author: string; roleOrLocation: string; quote: string; initials: string }>;
  recommendedTemplateId: TemplateId;
}

const SYSTEM_INSTRUCTION = `
You are the Creative Director and Master Copywriter at Pinsite, an elite boutique web design agency.
Your job is to generate a luxury, high-converting website blueprint for a real prospect in strict JSON format.

RULES FOR UNMATCHED COPYWRITING:
1. BAN GENERIC FLUFF: NEVER write phrases like "Welcome to our website", "We are the premier choice", "Quality you can trust", "Best service in town".
2. HYPER-LOCALIZED & AUTHENTIC: Use the exact city, area, and regional context.
3. INDUSTRY SPECIFICITY: Mention real techniques, materials, terminology, and realistic procedures (e.g. for dental: "biomimetic Zirconia", "microscope-guided precision endodontics", "keyhole titanium implants"; for roofing: "TPO single-ply", "silicone restoration", "Class 4 hail shingles"; for auto: "9H multi-layer ceramic", "micro-abrasive paint correction").
4. AESTHETIC SELECTION:
   - Pick recommendedTemplateId strictly from: "tactile-sheet", "editorial-gazette", "industrial-heavy", "neo-obsidian", "minimalist-swiss", "electric-kinetic", "warm-terracotta", "apex-authority", "emergency-dispatch", "neighborhood-trust".
5. OUTPUT FORMAT: Return ONLY valid raw JSON with NO markdown backticks or commentary.
`;

export async function generateAiWebsite(
  businessName: string,
  niche: string,
  city: string = 'Pune'
): Promise<AiGeneratedSite> {
  const apiKey = getApiKey();

  const prompt = `
Generate a complete, high-status website preview blueprint for this business:
- Business Name: "${businessName}"
- Industry / Niche: "${niche}"
- Location / City: "${city}"

Return JSON matching this exact structure:
{
  "tagline": "A punchy 3-5 word high-impact tagline",
  "headlineLine1": "Short word or two in UPPERCASE",
  "headlineLine2": "Short word or two in UPPERCASE",
  "headlineEmphasis": "Single closing punchy word (will be italicized)",
  "subheadline": "Compelling 2-sentence value proposition specific to their exact service and city with zero generic filler.",
  "philosophyStatementHtml": "A striking 2-sentence diagnosis/philosophy statement with <em>italic phrases</em> and <b>bold words</b> for visual rhythm.",
  "doctorOrOwnerName": "Realistic Founder or Lead Doctor name",
  "doctorOrOwnerTitle": "Realistic clinical or executive title (e.g. Lead Implantologist & Dental Surgeon)",
  "doctorBio": "2 sentences describing their obsessive attention to detail, clinical technology, and patient-first standards.",
  "recommendedTemplateId": "tactile-sheet",
  "services": [
    { "title": "Service 1 Title", "description": "15-20 words describing precise technique/procedure and tangible benefit.", "badge": "Specialty" },
    { "title": "Service 2 Title", "description": "15-20 words describing precise technique/procedure and tangible benefit.", "badge": "Popular" },
    { "title": "Service 3 Title", "description": "15-20 words describing precise technique/procedure and tangible benefit." },
    { "title": "Service 4 Title", "description": "15-20 words describing precise technique/procedure and tangible benefit." },
    { "title": "Service 5 Title", "description": "15-20 words describing precise technique/procedure and tangible benefit." },
    { "title": "Service 6 Title", "description": "15-20 words describing precise technique/procedure and tangible benefit." }
  ],
  "pillars": [
    { "title": "Pillar 1", "description": "Short explanation of clinical or workmanship standard." },
    { "title": "Pillar 2", "description": "Short explanation of clinical or workmanship standard." },
    { "title": "Pillar 3", "description": "Short explanation of clinical or workmanship standard." },
    { "title": "Pillar 4", "description": "Short explanation of clinical or workmanship standard." }
  ],
  "reviews": [
    { "author": "Real sounding local client", "roleOrLocation": "${city}", "quote": "Specific 2-sentence review mentioning a procedure, painless experience, or professional outcome.", "initials": "RK" },
    { "author": "Real sounding local client", "roleOrLocation": "${city}", "quote": "Specific 2-sentence review praising transparency and craftsmanship.", "initials": "SM" },
    { "author": "Real sounding local client", "roleOrLocation": "${city}", "quote": "Specific 2-sentence review praising zero wait time and natural results.", "initials": "AP" }
  ]
}
`;

  let lastErr = '';

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.35,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        lastErr = errJson?.error?.message || `HTTP ${res.status}`;
        continue;
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsed = JSON.parse(rawText) as AiGeneratedSite;
      return parsed;
    } catch (e: any) {
      lastErr = e?.message || 'Parse error';
    }
  }

  throw new Error(`Gemini AI generation failed across candidate models: ${lastErr}`);
}

export async function reRollSectionCopy(
  section: 'headline' | 'subheadline' | 'philosophy' | 'service',
  businessName: string,
  niche: string,
  currentText: string,
  tone: 'luxury' | 'urgent' | 'warm'
): Promise<string> {
  const apiKey = getApiKey();
  const toneDesc =
    tone === 'luxury'
      ? 'Ultra high-status, prestigious, understated, and authoritative'
      : tone === 'urgent'
      ? 'Direct-response, high-converting, action-oriented, emphasizing rapid availability'
      : 'Warm, empathetic, trustworthy, reassuring, and community-focused';

  const prompt = `
Rewrite this specific ${section} for ${businessName} (${niche}):
Current version: "${currentText}"
Tone required: ${toneDesc}

Output strictly valid JSON with key "rewritten":
{ "rewritten": "..." }
`;

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!res.ok) continue;
      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.rewritten) return parsed.rewritten;
      }
    } catch {
      // try next model
    }
  }

  return currentText;
}
