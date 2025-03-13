import type { Metadata } from 'next';
import BlogClientPage from './BlogClientPage';

export const metadata: Metadata = {
  title: 'Blog | Achieva Gemilang',
  description: 'Articles and thoughts on web development, design, and technology',
};

export default function BlogsPage() {
  return <BlogClientPage />;
}
