'use client';

import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useState } from 'react';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export default function ImageWithSkeleton({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  width,
  height,
  style,
  onLoad,
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    if (onLoad) {
      onLoad(e);
    }
  };

  if (fill) {
    return (
      <div className="relative w-full h-full">
        {isLoading && <Skeleton className="absolute inset-0" />}
        <Image
          src={src}
          alt={alt}
          fill
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          sizes={sizes}
          style={style}
          onLoad={handleLoad}
        />
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && <Skeleton className="absolute inset-0" />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        sizes={sizes}
        style={style}
        onLoad={handleLoad}
      />
    </div>
  );
}
