import { NextRequest, NextResponse } from 'next/server';
import { NICHE_VAULTS, listAllVaultNiches, resolveVaultNiche } from '@/lib/studio/vault';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nicheParam = searchParams.get('niche');
    const queryParam = searchParams.get('query');

    // Return specific niche by ID
    if (nicheParam) {
      const niche = NICHE_VAULTS[nicheParam.toLowerCase()];
      if (!niche) {
        return NextResponse.json(
          { success: false, error: `Niche "${nicheParam}" not found in studio vault.` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, niche });
    }

    // Resolve niche from query string (e.g. "smile dentist")
    if (queryParam) {
      const resolved = resolveVaultNiche(queryParam);
      return NextResponse.json({ success: true, niche: resolved });
    }

    // Default: list all available niches with overview metrics
    const catalog = listAllVaultNiches();
    return NextResponse.json({
      success: true,
      count: catalog.length,
      niches: catalog,
    });
  } catch (err: any) {
    console.error('[API Studio Vault Error]', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to retrieve niche vault.' },
      { status: 500 }
    );
  }
}
