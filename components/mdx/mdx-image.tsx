'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

interface MDXImageProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  showCaption?: boolean; // Allow controlling caption visibility
}

export default function MDXImage({
  src,
  alt = 'Blog image',
  width,
  height,
  className = '',
  style,
  showCaption = true, // Default to showing caption
}: MDXImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Parse width and height to numbers if they're strings
  const imgWidth = typeof width === 'string' ? parseInt(width, 10) : width;
  const imgHeight = typeof height === 'string' ? parseInt(height, 10) : height;

  // Calculate aspect ratio for skeleton if both width and height are provided
  const hasDimensions = imgWidth && imgHeight;
  const aspectRatio = hasDimensions ? imgHeight / imgWidth : 0.6; // Default 5:3 ratio
  const skeletonHeight = imgWidth ? imgWidth * aspectRatio : 376;

  return (
    <div className="my-4">
      <div
        className="relative mx-auto max-w-full inline-block w-full"
        style={{
          maxWidth: imgWidth ? `${imgWidth}px` : '100%',
        }}
      >
        {isLoading && (
          <Skeleton
            className="rounded-xl w-full"
            style={{
              height: hasDimensions ? `${skeletonHeight}px` : '376px',
              aspectRatio: hasDimensions ? `${imgWidth} / ${imgHeight}` : '5 / 3',
            }}
          />
        )}
        {hasError ? (
          <div
            className="flex items-center justify-center bg-muted rounded-xl w-full"
            style={{
              height: hasDimensions ? `${skeletonHeight}px` : '376px',
              minHeight: '200px',
            }}
          >
            <span className="text-muted-foreground text-sm">Failed to load image</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            width={imgWidth}
            height={imgHeight}
            className={`mx-auto max-w-full h-auto rounded-xl block transition-opacity duration-300 ${
              isLoading ? 'opacity-0 absolute inset-0' : 'opacity-100 relative'
            } ${className}`}
            style={{ margin: '0 auto', ...style }}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        )}
      </div>
      {alt && !hasError && showCaption && (
        <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
          <em>{alt}</em>
        </span>
      )}
    </div>
  );
}
