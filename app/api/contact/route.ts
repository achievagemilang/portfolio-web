import { createContactService } from '@/infrastructure/config/services.config';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const contactService = createContactService();
    const result = await contactService.sendContactForm(body);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);

    // Handle validation errors
    if (error instanceof Error && error.message.includes('Validation failed')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Handle service configuration errors
    if (error instanceof Error && error.message.includes('required')) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Handle generic errors
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
