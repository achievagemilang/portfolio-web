import type { Metadata } from 'next';
import BlogClientPage from './BlogClientPage';
import PageTransition from '@/components/util/page-transition';
import { getAllPosts } from '@/lib/mdx';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Writes | Achieva Gemilang',
  description: 'Articles and thoughts on web development, design, and technology',
};

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <PageTransition>
      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogClientPage posts={posts} />
      </Suspense>
    </PageTransition>
  );
}
