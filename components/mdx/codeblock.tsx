'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

// Import common language syntaxes
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-sql';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  // Extract text content from children
  const textContent = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') return child;
      if (React.isValidElement(child)) {
        const props = child.props as { children?: string };
        if (typeof props.children === 'string') {
          return props.children;
        }
      }
      return '';
    })
    .join('');

  // Apply syntax highlighting after component mounts and when content changes
  useEffect(() => {
    if (typeof window !== 'undefined' && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, language]);

  // Split text into lines for line numbering
  const codeLines = textContent.trim().split('\n');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Extract language display name
  const displayLanguage = language || className?.match(/language-(\w+)/)?.[1] || 'plaintext';

  return (
    <div className="relative group my-6">
      <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
        {/* Header with language and copy button */}
        <div className="flex justify-between items-center px-4 py-2 text-xs bg-gray-800 text-gray-200 border-b border-gray-700">
          {displayLanguage && <span className="font-mono font-medium">{displayLanguage}</span>}
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 transition-all"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 text-gray-300" />
            )}
          </button>
        </div>

        {/* Code content with line numbers */}
        <pre
          className={cn('py-4 px-4 overflow-x-auto w-full m-0 bg-transparent')}
          style={{ lineHeight: '1.5rem' }}
        >
          <code
            ref={codeRef}
            className={`language-${displayLanguage} font-mono text-sm`}
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        </pre>
      </div>
    </div>
  );
}
