import { NextRequest, NextResponse } from 'next/server';
import { compileWebsiteHtml } from '@/lib/studio/compiler';
import { WebsiteProject, TemplateId } from '@/lib/studio/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const project = (await req.json()) as WebsiteProject;

    if (!project || !project.businessName) {
      return NextResponse.json(
        { success: false, error: 'businessName is required.' },
        { status: 400 }
      );
    }

    const compiled = compileWebsiteHtml(project);

    return NextResponse.json({
      success: true,
      templateId: compiled.templateId,
      executionMs: compiled.executionMs,
      html: compiled.html,
    });
  } catch (err: any) {
    console.error('[API Preview Compiler Error]', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to compile website HTML.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const template = (searchParams.get('template') || 'tactile-sheet') as TemplateId;
    const niche = searchParams.get('niche') || 'dental';
    const biz = searchParams.get('biz') || 'Perfect Smile Dental Clinic';

    const project: WebsiteProject = {
      businessName: biz,
      niche,
      templateId: template,
      city: 'Hadapsar, Pune',
      phone: '+91 98765 43210',
      whatsappNumber: '919876543210',
    };

    const compiled = compileWebsiteHtml(project);

    return new Response(compiled.html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Compiled-Ms': compiled.executionMs.toString(),
      },
    });
  } catch (err: any) {
    console.error('[API Preview GET Error]', err);
    return new Response(`<h1>Error compiling preview</h1><p>${err?.message}</p>`, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
