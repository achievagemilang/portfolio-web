'use client';

import { Post } from '@/content-config';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { Clock } from 'lucide-react'; // Add this import for a nice icon

// Import MDXContent with dynamic import to ensure it only runs on the client
const MDXContent = dynamic(() => import('@/components/mdx-content'), {
  ssr: false, // This is crucial - disables server-side rendering
  loading: () => <div className="animate-pulse h-96 bg-muted/20 rounded-md"></div>,
});

interface BlogPostClientProps {
  post: Post;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <div className="container mx-auto py-12">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
            <span className="hidden sm:inline">•</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
            {post.tags?.map((tag) => (
              <span key={tag} className="bg-muted px-2 py-1 rounded-md text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="px-8 py-4 border border-border rounded-md">
          {post.mdxSource ? (
            <div className="mdx-content">
              <MDXContent source={post.mdxSource} />
            </div>
          ) : (
            <div className="bg-muted/20">{'No content available'}</div>
          )}
        </div>
      </article>
    </div>
  );
}
