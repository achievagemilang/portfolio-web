'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/blogs/blog-card';
import SearchBar from '@/components/blogs/search-bar';
import TagFilter from '@/components/blogs/tag-filter';
import { Button } from '@/components/ui/button';
import { getAllPosts } from '@/lib/mdx';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Post } from '@/content-config';

// Fallback posts data
export const fallbackPosts: {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags: string[];
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
}[] = [
  {
    _id: 'post-1',
    title: 'Getting Started with Next.js',
    date: '2023-01-15',
    excerpt: 'Learn how to build modern web applications with Next.js',
    slug: 'getting-started-with-nextjs',
    tags: ['Next.js', 'React', 'Web Development'],
    mdxSource: {
      compiledSource:
        'function _createMdxContent(props) { return _jsx("p", { children: "This is a placeholder for the MDX content." }); }',
      frontmatter: {},
      scope: {},
    } as MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>,
  },
  {
    _id: 'post-2',
    title: 'Styling with Tailwind CSS',
    date: '2023-02-10',
    excerpt: 'How to use Tailwind CSS to create beautiful, responsive designs',
    slug: 'styling-with-tailwind-css',
    tags: ['CSS', 'Tailwind', 'Design'],
    mdxSource: {
      compiledSource:
        'function _createMdxContent(props) { return _jsx("p", { children: "This is a placeholder for the MDX content." }); }',
      frontmatter: {},
      scope: {},
    } as MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>,
  },
  {
    _id: 'post-3',
    title: 'Server Components in Next.js',
    date: '2023-03-05',
    excerpt: 'Understanding the power of React Server Components in Next.js',
    slug: 'server-components-nextjs',
    tags: ['Next.js', 'React', 'Server Components'],
    mdxSource: {
      compiledSource:
        'function _createMdxContent(props) { return _jsx("p", { children: "This is a placeholder for the MDX content." }); }',
      frontmatter: {},
      scope: {},
    } as MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>,
  },
  {
    _id: 'post-4',
    title: 'Building a Portfolio with Next.js',
    date: '2023-04-20',
    excerpt: 'Step-by-step guide to creating a developer portfolio with Next.js',
    slug: 'portfolio-with-nextjs',
    tags: ['Next.js', 'Portfolio', 'Career'],
    mdxSource: {
      compiledSource:
        'function _createMdxContent(props) { return _jsx("p", { children: "This is a placeholder for the MDX content." }); }',
      frontmatter: {},
      scope: {},
    } as MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>,
  },
  {
    _id: 'post-5',
    title: 'Introduction to TypeScript',
    date: '2023-05-15',
    excerpt: 'Why TypeScript is becoming essential for modern web development',
    slug: 'intro-to-typescript',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    mdxSource: {
      compiledSource:
        'function _createMdxContent(props) { return _jsx("p", { children: "This is a placeholder for the MDX content." }); }',
      frontmatter: {},
      scope: {},
    } as MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>,
  },
];

interface PostsProps {
  posts: Post[];
}

export default function BlogClientPage({ posts }: PostsProps) {
  // Use fallback posts data
  const allPosts = posts.length > 0 ? posts : fallbackPosts;
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags from posts
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags || [])));

  // Filter posts based on search query and selected tag
  useEffect(() => {
    let result = allPosts;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by tag
    if (selectedTag) {
      result = result.filter((post) => post.tags?.includes(selectedTag));
    }

    setFilteredPosts(result);
  }, [searchQuery, selectedTag, allPosts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <SearchBar onSearch={handleSearch} />
        <TagFilter tags={allTags} onTagSelect={handleTagSelect} />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No posts found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
