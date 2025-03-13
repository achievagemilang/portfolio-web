import type { Metadata } from 'next';
import BlogClientPage from './BlogClientPage';
import PageTransition from '@/components/util/page-transition';
import { getAllPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Blog | Achieva Gemilang',
  description: 'Articles and thoughts on web development, design, and technology',
};

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <PageTransition>
      <BlogClientPage posts={posts} />
    </PageTransition>
  );
}
