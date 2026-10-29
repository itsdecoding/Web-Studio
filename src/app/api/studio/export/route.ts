import { NextRequest, NextResponse } from 'next/server';
import { compileWebsiteHtml } from '@/lib/studio/compiler';
import { getProjectBySlug } from '@/lib/studio/db';
import { WebsiteProject } from '@/lib/studio/types';

export const dynamic = 'force-dynamic';

/**
 * Phase 5.6: Client Handoff & Export Engine
 * Generates and downloads a self-contained, 100% standalone single-file index.html.
 * Includes inline CSS, inline JS event handlers, Google Fonts, and zero dependencies.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const format = searchParams.get('format') || 'html';
    const download = searchParams.get('download') !== 'false';

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Query parameter "slug" is required.' },
        { status: 400 }
      );
    }

    const project = await getProjectBySlug(slug);
    if (!project) {
      return NextResponse.json(
        { success: false, error: `Project with slug "${slug}" not found in database.` },
        { status: 404 }
      );
    }

    if (format === 'json') {
      return NextResponse.json({
        success: true,
        project,
      });
    }

    const compiled = compileWebsiteHtml(project);
    const filename = `${project.slug || slug}-index.html`;

    const headers: Record<string, string> = {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Compiled-Ms': compiled.executionMs.toString(),
      'X-Export-Engine': 'Pinsite-Web-Studio-v5.6',
    };

    if (download) {
      headers['Content-Disposition'] = `attachment; filename="${filename}"`;
    }

    return new Response(compiled.html, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    console.error('[Export GET Error]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to export client website.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const project = (body.project || body) as WebsiteProject;

    if (!project || !project.businessName) {
      return NextResponse.json(
        { success: false, error: 'Valid project with "businessName" is required for export.' },
        { status: 400 }
      );
    }

    const compiled = compileWebsiteHtml(project);
    const filename = `${project.slug || 'website'}-index.html`;

    // If client requested raw download attachment
    const asFile = req.nextUrl.searchParams.get('download') === 'true';

    if (asFile) {
      return new Response(compiled.html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'X-Compiled-Ms': compiled.executionMs.toString(),
        },
      });
    }

    // Default JSON response with HTML payload for client-side download handling
    return NextResponse.json({
      success: true,
      filename,
      executionMs: compiled.executionMs,
      html: compiled.html,
      bytes: Buffer.byteLength(compiled.html, 'utf-8'),
    });
  } catch (err: any) {
    console.error('[Export POST Error]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to compile export package.' },
      { status: 500 }
    );
  }
}
