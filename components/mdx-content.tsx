'use client';

import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define custom components to be used in MDX
const components = {
  h1: ({ children, ...props }: any) => {
    // Skip the first h1 as it's likely the title
    return null;
  },
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

interface MDXContentProps {
  source: any;
}

export default function MDXContent({ source }: MDXContentProps) {
  // Only render MDX when we're on the client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="animate-pulse h-96 bg-muted/20 rounded-md"></div>;
  }

  return <MDXRemote {...source} components={components} />;
}
