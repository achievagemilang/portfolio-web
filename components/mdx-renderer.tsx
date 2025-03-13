'use client';

// This component is deprecated in favor of mdx-content.tsx
// It's kept for backward compatibility
import MDXContent from './mdx-content';

export function MDXRenderer({ content }: { content: any }) {
  return <MDXContent source={content} />;
}
