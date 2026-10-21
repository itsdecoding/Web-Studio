/**
 * Pinsite Web Studio: Unique Vanity Slug Generator
 * Produces clean, executive URLs (e.g. "apex-dental-pune")
 * and guarantees database uniqueness.
 */

import crypto from 'crypto';
import { getAdminClient } from '@/lib/supabase';

export async function generateUniqueStudioSlug(name: string, city?: string): Promise<string> {
  const cleanName = (name || 'website')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 32);

  const cleanCity = (city || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 16);

  let candidate = cleanCity && !cleanName.includes(cleanCity)
    ? `${cleanName}-${cleanCity}`
    : cleanName;

  if (!candidate || candidate.length < 3) {
    candidate = `site-${crypto.randomBytes(3).toString('hex')}`;
  }

  try {
    const admin = getAdminClient();
    const { data } = await admin
      .from('website_previews')
      .select('id')
      .eq('slug', candidate)
      .maybeSingle();

    if (!data) {
      return candidate;
    }

    // Slug is already taken, generate with short unique suffix
    const suffix = crypto.randomBytes(2).toString('hex');
    return `${candidate}-${suffix}`;
  } catch (err) {
    console.error('[Studio Slug] Error checking slug uniqueness, appending suffix:', err);
    const suffix = crypto.randomBytes(3).toString('hex');
    return `${candidate}-${suffix}`;
  }
}
