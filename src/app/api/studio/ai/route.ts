import { NextRequest, NextResponse } from 'next/server';
import { generateAiWebsite, reRollSectionCopy } from '@/lib/studio/ai';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, businessName, niche, city, section, currentText, tone } = body;

    if (action === 'draft') {
      if (!businessName) {
        return NextResponse.json(
          { success: false, error: 'businessName is required for AI generation.' },
          { status: 400 }
        );
      }

      const generated = await generateAiWebsite(
        businessName,
        niche || 'general',
        city || 'Pune'
      );

      return NextResponse.json({
        success: true,
        data: generated,
      });
    }

    if (action === 'reroll') {
      const rewritten = await reRollSectionCopy(
        section || 'headline',
        businessName || 'Business',
        niche || 'general',
        currentText || '',
        tone || 'luxury'
      );

      return NextResponse.json({
        success: true,
        rewritten,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action. Supported: "draft", "reroll"' },
      { status: 400 }
    );
  } catch (err: any) {
    console.error('[API Studio AI Error]', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'AI generation failed.' },
      { status: 500 }
    );
  }
}
