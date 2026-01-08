'use client';

import BlogCard from '@/components/blogs/blog-card';
import type { Post } from '@/content-config';
import { useLanguage } from '@/context/language-context';
import { useMemo } from 'react';

interface RelatedBlogsProps {
  currentPostSlug: string;
  posts: Post[];
}

// Simple seeded random number generator (Mulberry32)
function seededRandom(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function RelatedBlogs({ currentPostSlug, posts }: RelatedBlogsProps) {
  const { t } = useLanguage();
  // Filter out current post and get 2 related posts using deterministic selection
  const relatedPosts = useMemo(() => {
    const otherPosts = posts.filter((p) => p.slug !== currentPostSlug);

    // Create a seed from the slug string
    const slugSeed = currentPostSlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = seededRandom(slugSeed * 9973 + 7919);

    // Fisher-Yates shuffle with seeded random
    const shuffled = [...otherPosts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 2);
  }, [currentPostSlug, posts]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t border-border">
      <h2 className="text-3xl font-bold mb-8">{t.blog.related.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedPosts.map((post) => (
          <div key={post.slug} className="h-full">
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
