import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostClient from './BlogClientPage';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';

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

  return {
    title: `${finalPost.title} | Achieva Futura Gemilang`,
    description: finalPost.excerpt,
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
