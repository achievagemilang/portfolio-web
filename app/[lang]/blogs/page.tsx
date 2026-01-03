import type { Metadata } from 'next';
import BlogClientPage from './BlogClientPage';
import PageTransition from '@/components/util/page-transition';
import { getAllPosts } from '@/lib/mdx';
import { Suspense } from 'react';

function BlogCollectionStructuredData({ posts }: { posts: Awaited<ReturnType<typeof getAllPosts>> }) {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Writes | Achieva Futura Gemilang',
    description: 'Articles and thoughts on software engineering, system design, and life-long learning.',
    url: 'https://achievagemilang.live/blogs',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          url: `https://achievagemilang.live/blogs/${post.slug}`,
          datePublished: new Date(post.date).toISOString(),
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
    />
  );
}

export const metadata: Metadata = {
  title: 'Writes | Achieva Futura Gemilang',
  description:
    'Articles and thoughts on software engineering, system design, and life-long learning.',
  keywords: 'software engineering, system design, programming, web development, technology blog, coding tutorials',
  alternates: {
    canonical: 'https://achievagemilang.live/blogs',
  },
  openGraph: {
    title: 'Writes | Achieva Futura Gemilang',
    description:
      'Articles and thoughts on software engineering, system design, and life-long learning.',
    url: 'https://achievagemilang.live/blogs',
    type: 'website',
    siteName: 'Achieva Futura Gemilang',
    images: [
      {
        url: 'https://achievagemilang.live/AGLogoRevamped.png',
        width: 1200,
        height: 630,
        alt: 'Achieva Futura Gemilang - Blog Posts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writes | Achieva Futura Gemilang',
    description:
      'Articles and thoughts on software engineering, system design, and life-long learning.',
    creator: '@achievagemilang',
    images: ['https://achievagemilang.live/AGLogoRevamped.png'],
  },
};

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <>
      <BlogCollectionStructuredData posts={posts} />
      <PageTransition>
        <Suspense fallback={<div>Loading writes...</div>}>
          <BlogClientPage posts={posts} />
        </Suspense>
      </PageTransition>
    </>
  );
}
