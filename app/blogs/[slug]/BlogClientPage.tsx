'use client';

import { format } from 'date-fns';
import { MDXRenderer } from '@/components/mdx-renderer';
import { Post } from '@/content-config';

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
          <div className="p-4 border border-border rounded-md bg-muted/20 mdx-content">
            <MDXRenderer content={post.mdxSource} />
          </div>
        ) : (
          <div className="p-4 border border-border rounded-md bg-muted/20">
            {post.mdxSource?.code || 'No content available'}
          </div>
        )}
      </article>
    </div>
  );
}
