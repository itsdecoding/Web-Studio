import { NextRequest, NextResponse } from 'next/server';
import { uploadStudioImageBuffer, validateExternalImageUrl } from '@/lib/studio/upload';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    // Mode A: Direct URL validation & verification
    if (contentType.includes('application/json')) {
      const body = await req.json();
      const { imageUrl } = body;

      if (!imageUrl || typeof imageUrl !== 'string') {
        return NextResponse.json(
          { success: false, error: 'Please provide a valid imageUrl string.' },
          { status: 400 }
        );
      }

      const validation = await validateExternalImageUrl(imageUrl);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 422 }
        );
      }

      return NextResponse.json({
        success: true,
        source: 'url',
        url: validation.url,
        contentType: validation.contentType,
      });
    }

    // Mode B: Multipart file upload (Computer or Phone)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const folder = (formData.get('folder') as string) || 'uploads';

      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No image file was received in the form data.' },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await uploadStudioImageBuffer(
        buffer,
        file.name || 'image.jpg',
        file.type || 'image/jpeg',
        folder
      );

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        source: 'upload',
        url: result.url,
        fileName: result.fileName,
        sizeBytes: result.sizeBytes,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Expected application/json or multipart/form-data' },
      { status: 400 }
    );
  } catch (err: any) {
    console.error('[API Studio Upload Error]', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Internal server error while processing image.' },
      { status: 500 }
    );
  }
}
