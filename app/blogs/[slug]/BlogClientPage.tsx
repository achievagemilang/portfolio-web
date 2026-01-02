'use client';

import RelatedBlogs from '@/components/blogs/related-blogs';
import { Skeleton } from '@/components/ui/skeleton';
import { Post } from '@/content-config';
import { useBlogViewCount } from '@/hooks/use-blog-view-count';
import { format } from 'date-fns';
import { Clock, Eye } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import MDXContent with dynamic import to ensure it only runs on the client
const MDXContent = dynamic(() => import('@/components/mdx-content'), {
  ssr: false, // This is crucial - disables server-side rendering
  loading: () => <div className="animate-pulse h-96 bg-muted/20 rounded-md"></div>,
});

interface BlogPostClientProps {
  post: Post;
  allPosts: Post[];
}

export default function BlogPostClient({ post, allPosts }: BlogPostClientProps) {
  const url = `https://achievagemilang.live/blogs/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();

  // Fetch and increment view count from Redis
  const { viewCount, isLoading: isViewCountLoading } = useBlogViewCount(post.slug, {
    initialCount: 0,
    incrementOnMount: true,
  });

  // Generate JSON-LD structured data for SEO
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: 'https://achievagemilang.live/AGLogoRevamped.png',
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      '@type': 'Person',
      name: 'Achieva Futura Gemilang',
      url: 'https://achievagemilang.live',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Achieva Futura Gemilang',
      logo: {
        '@type': 'ImageObject',
        url: 'https://achievagemilang.live/AGLogoRevamped.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags?.join(', ') || '',
    articleSection: post.tags?.[0] || 'Blog',
    timeRequired: `PT${post.readingTime}M`,
  };

  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://achievagemilang.live',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Writes',
        item: 'https://achievagemilang.live/blogs',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container mx-auto py-12">
        <article
          className="prose dark:prose-invert max-w-none"
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          <h1 className="text-4xl font-bold mb-4" itemProp="headline">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
            <div className="flex flex-wrap items-center gap-2">
              <time dateTime={post.date} itemProp="datePublished">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              <span className="hidden sm:inline">•</span>
            </div>

            <div className="flex items-center gap-1" itemProp="timeRequired">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>

            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {isViewCountLoading ? (
                <Skeleton className="h-4 w-12" />
              ) : (
                <span>
                  {viewCount.toLocaleString()} {viewCount === 1 ? 'view' : 'views'}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted px-2 py-1 rounded-md text-xs"
                  itemProp="keywords"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="px-8 py-4 border border-border rounded-md" itemProp="articleBody">
            {post.mdxSource ? (
              <div className="mdx-content">
                <MDXContent source={post.mdxSource} />
              </div>
            ) : (
              <div className="bg-muted/20">{'No content available'}</div>
            )}
          </div>
        </article>

        {/* Related Posts Section */}
        <RelatedBlogs currentPostSlug={post.slug} posts={allPosts} />
      </div>
    </>
  );
}
