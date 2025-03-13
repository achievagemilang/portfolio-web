'use client';

import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import Link from 'next/link';

// Define custom components to be used in MDX
const components = {
  img: (props: any) => (
    <div className="my-8">
      <Image
        {...props}
        width={800}
        height={500}
        className="rounded-lg mx-auto"
        alt={props.alt || 'Blog image'}
      />
    </div>
  ),
  a: (props: any) => (
    <Link {...props} className="text-primary underline hover:text-primary/80">
      {props.children}
    </Link>
  ),
  // Add more custom components as needed
};

interface MDXRendererProps {
  content: any;
}

export function MDXRenderer({ content }: MDXRendererProps) {
  return <MDXRemote {...content} components={components} />;
}
