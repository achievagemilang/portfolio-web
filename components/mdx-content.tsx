'use client';

import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { createContext, useContext, useEffect, useState } from 'react';
import Callout from './mdx/callout';
import { CodeBlock } from './mdx/codeblock';
import MDXImage from './mdx/mdx-image';

// Context to track if we're inside a figure tag
const FigureContext = createContext(false);

// Wrapper component for images that can access context
const MDXImageWrapper = (props: any) => {
  const inFigure = useContext(FigureContext);
  return <MDXImage {...props} showCaption={!inFigure} />;
};

// Define custom components to be used in MDX
const components = {
  h1: ({ children, ...props }: any) => {
    // Skip the first h1 as it's likely the title
    return null;
  },
  p: ({ children, className, ...props }: any) => {
    // Prevent nested p tags by ensuring we don't render p inside p
    // If className is provided, it's likely a custom styled p tag from MDX
    // In that case, we render it as-is, but MDX should handle this correctly
    return (
      <p className={className} {...props}>
        {children}
      </p>
    );
  },
  img: MDXImageWrapper,
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
  Callout,
  figure: ({ children, className, ...props }: any) => {
    return (
      <FigureContext.Provider value={true}>
        <figure className={className || 'text-center mx-auto max-w-full'} {...props}>
          {children}
        </figure>
      </FigureContext.Provider>
    );
  },
  figcaption: ({ children, className, ...props }: any) => {
    return (
      <figcaption
        className={className || 'text-md md:text-lg text-gray-500 dark:text-gray-400 mt-1'}
        {...props}
      >
        {children}
      </figcaption>
    );
  },
};

interface MDXContentProps {
  source: any;
}

export default function MDXContent({ source }: MDXContentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="animate-pulse h-96 bg-muted/20 rounded-md"></div>;
  }

  return <MDXRemote {...source} components={components} />;
}
