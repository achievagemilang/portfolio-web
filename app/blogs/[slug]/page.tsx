import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogClientPage';

type tParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getAllPosts();

  // If we have actual posts, use them; otherwise fall back to our hardcoded ones
  const allPosts = posts;

  return allPosts.map((post) => ({
    slug: post!.slug,
  }));
}

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { slug }: { slug: string } = await params;

  // Try to get the real post first
  const post = await getPostBySlug(slug);

  // Fall back to hardcoded data if needed
  const finalPost = post;

  if (!finalPost) {
    return {
      title: 'Post Not Found',
    };
  }

  const url = `https://achievagemilang.live/blogs/${slug}`;
  const publishedTime = new Date(finalPost.date).toISOString();
  const tags = finalPost.tags || [];
  const keywords = tags.join(', ');

  return {
    title: `${finalPost.title} | Achieva Futura Gemilang`,
    description: finalPost.excerpt,
    keywords: keywords,
    authors: [{ name: 'Achieva Futura Gemilang', url: 'https://achievagemilang.live' }],
    creator: 'Achieva Futura Gemilang',
    publisher: 'Achieva Futura Gemilang',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${finalPost.title} | Achieva Futura Gemilang`,
      description: finalPost.excerpt,
      url: url,
      type: 'article',
      publishedTime: publishedTime,
      authors: ['Achieva Futura Gemilang'],
      tags: tags,
      siteName: 'Achieva Futura Gemilang',
      images: [
        {
          url: 'https://achievagemilang.live/AGLogoRevamped.png',
          width: 1200,
          height: 630,
          alt: finalPost.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${finalPost.title} | Achieva Futura Gemilang`,
      description: finalPost.excerpt,
      creator: '@achievagemilang',
      images: ['https://achievagemilang.live/AGLogoRevamped.png'],
    },
    other: {
      'article:published_time': publishedTime,
      'article:author': 'Achieva Futura Gemilang',
      'article:section': tags[0] || 'Blog',
    },
  };
}

export default async function BlogPostPage({ params }: { params: tParams }) {
  const { slug }: { slug: string } = await params;

  // Try to get the real post first
  const post = await getPostBySlug(slug);

  // Fall back to hardcoded data if needed
  const finalPost = post;

  if (!finalPost) {
    notFound();
  }

  return <BlogPostClient post={finalPost} />;
}
