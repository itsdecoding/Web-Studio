import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/studio/keys';
import { generateWebsiteSite, GenerateSiteParams } from '@/lib/studio/generator';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. API Key Authentication
    const authHeader = req.headers.get('x-studio-api-key') || req.headers.get('authorization');
    let rawKey = '';
    if (authHeader) {
      if (authHeader.toLowerCase().startsWith('bearer ')) {
        rawKey = authHeader.replace(/^bearer\s+/i, '').trim();
      } else {
        rawKey = authHeader.trim();
      }
    }

    if (!rawKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Missing Studio API Key. Please provide a valid key via the "X-Studio-Api-Key" header or "Authorization: Bearer <key>".',
        },
        { status: 401 }
      );
    }

    const authCheck = await validateApiKey(rawKey);
    if (!authCheck.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Invalid, expired, or revoked Studio API Key.',
        },
        { status: 401 }
      );
    }

    // 2. Parse and Validate Request Body
    const body = (await req.json().catch(() => ({}))) as GenerateSiteParams;
    if (!body || !body.businessName || !body.businessName.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: "businessName".',
        },
        { status: 400 }
      );
    }

    // 3. Orchestrate Dual-Link Generation
    const result = await generateWebsiteSite(body);

    return NextResponse.json({
      success: true,
      slug: result.slug,
      public_url: result.public_url,
      editor_url: result.editor_url,
      local_editor_url: result.local_editor_url,
      businessName: result.businessName,
      niche: result.niche,
      city: result.city,
      templateId: result.templateId,
      executionMs: result.executionMs,
      keyName: authCheck.name,
    });
  } catch (error: any) {
    console.error('[API /api/generate Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate website preview',
      },
      { status: 500 }
    );
  }
}
