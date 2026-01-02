import { getViewCount, incrementViewCount } from '@/lib/redis';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/views/[slug] - Get view count for a project
export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const views = await getViewCount(slug);
  return NextResponse.json({ views });
}

// POST /api/views/[slug] - Increment view count for a project
export async function POST(request: Request, { params }: RouteParams) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const views = await incrementViewCount(slug);
  return NextResponse.json({ views });
}
