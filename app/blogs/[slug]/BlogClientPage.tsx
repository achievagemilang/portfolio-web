'use client';

import { format } from 'date-fns';

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

        {/* Placeholder for MDX content */}
        <div className="p-4 border border-border rounded-md bg-muted/20">{post.body?.code}</div>
      </article>
    </div>
  );
}
