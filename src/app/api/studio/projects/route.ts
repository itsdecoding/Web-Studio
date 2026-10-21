import { NextRequest, NextResponse } from 'next/server';
import { listAllProjects, getProjectBySlug, saveProject, deleteProjectById } from '@/lib/studio/db';
import { WebsiteProject } from '@/lib/studio/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const project = await getProjectBySlug(slug);
      if (!project) {
        return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, project });
    }

    const projects = await listAllProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error('[API Projects] GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as WebsiteProject;
    if (!body || !body.businessName) {
      return NextResponse.json({ success: false, error: 'businessName is required' }, { status: 400 });
    }

    const result = await saveProject(body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      slug: body.slug,
      message: 'Website project published successfully',
    });
  } catch (error: any) {
    console.error('[API Projects] POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID required' }, { status: 400 });
    }

    const success = await deleteProjectById(id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error: any) {
    console.error('[API Projects] DELETE error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
