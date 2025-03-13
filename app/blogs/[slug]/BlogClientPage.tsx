'use client';

import { format } from 'date-fns';
import dynamic from 'next/dynamic';

// Import MDXContent with dynamic import to ensure it only runs on the client
const MDXContent = dynamic(() => import('@/components/mdx-content'), {
  ssr: false, // This is crucial - disables server-side rendering
  loading: () => <div className="animate-pulse h-96 bg-muted/20 rounded-md"></div>,
});

interface Post {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags?: string[];
  body?: {
    code: string;
  };
  mdxSource?: any;
}

interface BlogPostClientProps {
  post: Post;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <div className="container mx-auto py-12">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 mb-8 text-muted-foreground">
          <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          <div className="flex gap-2">
            {post.tags?.map((tag) => (
              <span key={tag} className="bg-muted px-2 py-1 rounded-md text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Render MDX content if available, otherwise fall back to the placeholder */}
        {post.mdxSource ? (
          <div className="mdx-content">
            <MDXContent source={post.mdxSource} />
          </div>
        ) : (
          <div className="p-4 border border-border rounded-md bg-muted/20">
            {post.body?.code || 'No content available'}
          </div>
        )}
      </article>
    </div>
  );
}
