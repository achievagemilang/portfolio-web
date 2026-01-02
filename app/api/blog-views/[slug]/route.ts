import { getBlogViewCount, incrementBlogViewCount } from '@/lib/redis';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/blog-views/[slug] - Get view count for a blog post
export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const views = await getBlogViewCount(slug);
  return NextResponse.json({ views });
}

// POST /api/blog-views/[slug] - Increment view count for a blog post
export async function POST(request: Request, { params }: RouteParams) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const views = await incrementBlogViewCount(slug);
  return NextResponse.json({ views });
}
