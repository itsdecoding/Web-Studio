/**
 * Pinsite Web Studio: Database Client & Projects Layer
 * Connects directly to Supabase website_previews table
 */

import { getAdminClient } from '@/lib/supabase';
import { resolveVaultNiche } from './vault';
import { WebsiteProject, TemplateId } from './types';

export interface StudioProjectSummary {
  id: string;
  slug: string;
  businessName: string;
  niche: string;
  city: string;
  templateId: string;
  viewCount: number;
  lastViewedAt: string | null;
  createdAt: string;
  heroImage: string;
}

export async function listAllProjects(): Promise<StudioProjectSummary[]> {
  try {
    const admin = getAdminClient();
    const { data, error } = await admin
      .from('website_previews')
      .select('id, slug, theme, site_data, view_count, last_viewed_at, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Studio DB] Error listing projects:', error);
      return [];
    }

    return (data || []).map((row: any) => {
      const siteData = row.site_data || {};
      const niche = siteData.niche || 'dental';
      const vault = resolveVaultNiche(niche);
      const heroImage =
        siteData.customImages?.hero ||
        siteData.hero?.heroImageUrl ||
        vault.hero;

      return {
        id: row.id,
        slug: row.slug,
        businessName: siteData.businessName || siteData.name || 'Untitled Practice',
        niche,
        city: siteData.city || siteData.area || 'Pune',
        templateId: row.theme || siteData.themeId || 'tactile-sheet',
        viewCount: row.view_count || 0,
        lastViewedAt: row.last_viewed_at,
        createdAt: row.created_at,
        heroImage,
      };
    });
  } catch (err) {
    console.error('[Studio DB] Exception listing projects:', err);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<WebsiteProject | null> {
  try {
    const admin = getAdminClient();
    const { data, error } = await admin
      .from('website_previews')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    const siteData = data.site_data || {};
    return {
      businessName: siteData.businessName || siteData.name || 'Untitled Practice',
      niche: siteData.niche || 'dental',
      templateId: (data.theme || siteData.themeId || 'tactile-sheet') as TemplateId,
      slug: data.slug,
      headlineLine1: siteData.headlineLine1 || siteData.headline || '',
      headlineLine2: siteData.headlineLine2 || '',
      subheadline: siteData.subheadline || siteData.subtext || '',
      phone: siteData.phone || '',
      whatsappNumber: siteData.whatsappNumber || '',
      city: siteData.city || siteData.area || '',
      address: siteData.address || '',
      doctorOrOwnerName: siteData.doctorOrOwnerName || '',
      doctorOrOwnerTitle: siteData.doctorOrOwnerTitle || '',
      rating: siteData.rating || 4.9,
      reviewCount: siteData.reviewCount || 120,
      services: siteData.services || [],
      customImages: siteData.customImages || {},
      blocks: siteData.blocks || undefined,
    };
  } catch (err) {
    console.error('[Studio DB] Get project exception:', err);
    return null;
  }
}

export async function saveProject(
  project: WebsiteProject,
  explicitLeadId?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const admin = getAdminClient();
    const slug = (project.slug || project.businessName)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'website-preview';

    const vault = resolveVaultNiche(project.niche || 'dental');
    const heroImage = project.customImages?.hero || vault.hero;

    const siteData = {
      businessName: project.businessName,
      name: project.businessName,
      niche: project.niche,
      city: project.city,
      area: project.city,
      phone: project.phone,
      whatsappNumber: project.whatsappNumber,
      address: project.address,
      doctorOrOwnerName: project.doctorOrOwnerName,
      doctorOrOwnerTitle: project.doctorOrOwnerTitle,
      headlineLine1: project.headlineLine1,
      headlineLine2: project.headlineLine2,
      headline: [project.headlineLine1, project.headlineLine2].filter(Boolean).join(' '),
      subheadline: project.subheadline,
      subtext: project.subheadline,
      services: project.services,
      customImages: project.customImages,
      blocks: project.blocks,
      themeId: project.templateId,
      rating: project.rating || 4.9,
      reviewCount: project.reviewCount || 120,
      hero: {
        heroImageUrl: heroImage,
      },
    };

    // Clean Database Decoupling:
    // If an explicit leadId is provided (e.g. from Agency OS cold calling), associate it.
    // If not, default to null so Web Studio does NOT pollute the leads cold calling pool.
    let leadId: string | null = explicitLeadId || null;

    // Check if slug already exists to update or insert
    const { data: existing } = await admin
      .from('website_previews')
      .select('id, lead_id')
      .eq('slug', slug)
      .maybeSingle();

    if (existing?.id) {
      const updatePayload: any = {
        theme: project.templateId || 'tactile-sheet',
        site_data: siteData,
      };
      if (leadId) {
        updatePayload.lead_id = leadId;
      }

      const { error: updateError } = await admin
        .from('website_previews')
        .update(updatePayload)
        .eq('id', existing.id);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      if (leadId) {
        await admin.from('leads').update({ active_preview_slug: slug }).eq('id', leadId);
      }

      return { success: true, id: existing.id };
    } else {
      // First attempt: insert with lead_id (null for standalone studio projects)
      const insertPayload: any = {
        slug,
        theme: project.templateId || 'tactile-sheet',
        font_pairing: 'instrument',
        site_data: siteData,
        view_count: 0,
        lead_id: leadId,
      };

      let { data: inserted, error: insertError } = await admin
        .from('website_previews')
        .insert(insertPayload)
        .select('id')
        .single();

      // Graceful fallback if database schema still has NOT NULL constraint on lead_id:
      // Attach to a single dedicated system anchor lead with status 'closed_won'
      // CRITICAL: NEVER create an 'unassigned' lead, preserving the Agency OS cold caller pool 100% PRISTINE!
      if (insertError && (insertError.code === '23502' || insertError.message?.includes('not-null'))) {
        let anchorId: string | null = null;
        const { data: existingAnchor } = await admin
          .from('leads')
          .select('id')
          .eq('name', 'Pinsite Web Studio Workspace')
          .maybeSingle();

        if (existingAnchor?.id) {
          anchorId = existingAnchor.id;
        } else {
          const { data: newAnchor } = await admin
            .from('leads')
            .insert({
              name: 'Pinsite Web Studio Workspace',
              phone: '+1 000 000 0000',
              normalized_phone: '+10000000000',
              niche: 'system',
              area: 'Studio',
              address: 'Pinsite Studio System Anchor',
              score: 0,
              status: 'closed_won', // Won/Closed leads are never assigned to dialer pool
            })
            .select('id')
            .single();
          anchorId = newAnchor?.id || null;
        }

        if (anchorId) {
          const retry = await admin
            .from('website_previews')
            .insert({
              ...insertPayload,
              lead_id: anchorId,
            })
            .select('id')
            .single();

          inserted = retry.data;
          insertError = retry.error;
        }
      }

      if (insertError || !inserted) {
        return { success: false, error: insertError?.message || 'Failed to insert website preview' };
      }

      if (leadId) {
        await admin.from('leads').update({ active_preview_slug: slug }).eq('id', leadId);
      }

      return { success: true, id: inserted.id };
    }
  } catch (err: any) {
    console.error('[Studio DB] Save project exception:', err);
    return { success: false, error: err.message };
  }
}

export async function deleteProjectById(id: string): Promise<boolean> {
  try {
    const admin = getAdminClient();
    const { error } = await admin
      .from('website_previews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Studio DB] Delete project error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Studio DB] Delete project exception:', err);
    return false;
  }
}
