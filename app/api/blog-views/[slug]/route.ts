import { getBlogViewCount, incrementBlogViewCount } from '@/lib/redis';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// Cache GET requests for 5 minutes to reduce Redis calls
export const revalidate = 300;

// GET /api/blog-views/[slug] - Get view count for a blog post (cached for 60s)
export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const views = await getBlogViewCount(slug);

  // Add cache headers for CDN/browser caching
  return NextResponse.json(
    { views },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}

// POST /api/blog-views/[slug] - Increment view count for a blog post (not cached)
export async function POST(request: Request, { params }: RouteParams) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const views = await incrementBlogViewCount(slug);

  // No caching for POST - always fresh
  return NextResponse.json(
    { views },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}
