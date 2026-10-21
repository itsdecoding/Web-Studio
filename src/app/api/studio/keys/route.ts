import { NextResponse } from 'next/server';
import { listApiKeys, createApiKey, revokeApiKey, deleteApiKey } from '@/lib/studio/keys';

export async function GET() {
  try {
    const keys = await listApiKeys();
    return NextResponse.json({ success: true, keys });
  } catch (error: any) {
    console.error('[API Keys] GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name } = body;
    const result = await createApiKey(name || 'API Client');
    return NextResponse.json({
      success: true,
      rawKey: result.rawKey,
      key: result.key,
    });
  } catch (error: any) {
    console.error('[API Keys] POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, action } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Key ID required' }, { status: 400 });
    }

    if (action === 'revoke') {
      const ok = await revokeApiKey(id);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('[API Keys] PATCH error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Key ID required' }, { status: 400 });
    }

    const ok = await deleteApiKey(id);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
    console.error('[API Keys] DELETE error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
