import type { Metadata } from 'next';
import BlogClientPage from './BlogClientPage';
import PageTransition from '@/components/util/page-transition';
import { getAllPosts } from '@/lib/mdx';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Writes | Achieva Futura Gemilang',
  description:
    'Articles and thoughts on software engineering, system design, and life-long learning.',
  openGraph: {
    title: 'Writes | Achieva Futura Gemilang',
    description:
      'Articles and thoughts on software engineering, system design, and life-long learning.',
    url: 'https://achievagemilang.live/blogs',
    type: 'website',
    images: [
      {
        url: 'https://achievagemilang.live/AGLogoRevamped.png',
        width: 1200,
        height: 630,
        alt: 'Achieva Futura Gemilang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writes | Achieva Futura Gemilang',
    description:
      'Articles and thoughts on software engineering, system design, and life-long learning.',
    images: ['https://achievagemilang.live/AGLogoRevamped.png'],
  },
};

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <PageTransition>
      <Suspense fallback={<div>Loading writes...</div>}>
        <BlogClientPage posts={posts} />
      </Suspense>
    </PageTransition>
  );
}
