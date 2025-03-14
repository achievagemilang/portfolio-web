'use client';

import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CodeBlock } from './mdx/codeblock';

// Define custom components to be used in MDX
const components = {
  h1: ({ children, ...props }: any) => {
    // Skip the first h1 as it's likely the title
    return null;
  },
  img: (props: any) => {
    return (
      <>
        <img
          {...props}
          width={props.width || 624}
          height={props.height || 376}
          alt={props.alt || 'Blog image'}
          className="mx-auto max-w-full h-auto rounded-xl block"
          style={{ margin: '1rem auto' }}
        />
        <span className="block text-sm text-gray-500 mt-1 text-center">
          <em>{props.alt}</em>
        </span>
      </>
    );
  },
  a: (props: any) => (
    <Link {...props} className="text-primary underline hover:text-primary/80">
      {props.children}
    </Link>
  ),
  pre: (props: any) => {
    const className = props.children.props.className || '';
    const matches = className.match(/language-(.+)/);
    const language = matches?.[1] || '';

    return (
      <CodeBlock language={language} className={className}>
        {props.children}
      </CodeBlock>
    );
  },
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
