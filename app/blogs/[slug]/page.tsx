import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostClient from './BlogClientPage';

// Fallback posts data
const fallbackPosts = [
  {
    _id: 'post-1',
    title: 'Getting Started with Next.js',
    date: '2023-01-15',
    excerpt: 'Learn how to build modern web applications with Next.js',
    slug: 'getting-started-with-nextjs',
    tags: ['Next.js', 'React', 'Web Development'],
    body: {
      code: 'This is a placeholder for the MDX content. In a real application, this would be rendered using the MDX component.',
    },
  },
  {
    _id: 'post-2',
    title: 'Styling with Tailwind CSS',
    date: '2023-02-10',
    excerpt: 'How to use Tailwind CSS to create beautiful, responsive designs',
    slug: 'styling-with-tailwind-css',
    tags: ['CSS', 'Tailwind', 'Design'],
    body: {
      code: 'This is a placeholder for the MDX content. In a real application, this would be rendered using the MDX component.',
    },
  },
  {
    _id: 'post-3',
    title: 'Server Components in Next.js',
    date: '2023-03-05',
    excerpt: 'Understanding the power of React Server Components in Next.js',
    slug: 'server-components-nextjs',
    tags: ['Next.js', 'React', 'Server Components'],
    body: {
      code: 'This is a placeholder for the MDX content. In a real application, this would be rendered using the MDX component.',
    },
  },
  {
    _id: 'post-4',
    title: 'Building a Portfolio with Next.js',
    date: '2023-04-20',
    excerpt: 'Step-by-step guide to creating a developer portfolio with Next.js',
    slug: 'portfolio-with-nextjs',
    tags: ['Next.js', 'Portfolio', 'Career'],
    body: {
      code: 'This is a placeholder for the MDX content. In a real application, this would be rendered using the MDX component.',
    },
  },
  {
    _id: 'post-5',
    title: 'Introduction to TypeScript',
    date: '2023-05-15',
    excerpt: 'Why TypeScript is becoming essential for modern web development',
    slug: 'intro-to-typescript',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    body: {
      code: 'This is a placeholder for the MDX content. In a real application, this would be rendered using the MDX component.',
    },
  },
];

type tParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return fallbackPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { slug }: { slug: string } = await params;
  const post = fallbackPosts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Your Name`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: tParams }) {
  const { slug }: { slug: string } = await params;
  const post = fallbackPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
