'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { getTechStackSvgPath } from '@/lib/tech-stack-svg-mapper';
import { useEffect, useRef, useState } from 'react';

interface TechStackIconProps {
  techStackName: string;
  size?: number;
  className?: string;
  showFallback?: boolean;
  onError?: () => void;
}

export default function TechStackIcon({
  techStackName,
  size = 32,
  className = '',
  showFallback = false,
  onError,
}: TechStackIconProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const svgPath = getTechStackSvgPath(techStackName);

  // Check if image is already loaded when component mounts or path changes
  useEffect(() => {
    if (!svgPath) return;

    setIsLoading(true);
    setHasError(false);

    // Small delay to allow DOM to update
    const checkImage = () => {
      if (imgRef.current) {
        const img = imgRef.current;
        // Check if image is already loaded (cached)
        if (img.complete && img.naturalWidth > 0) {
          setIsLoading(false);
        }
      }
    };

    // Check immediately and after a short delay
    checkImage();
    const timeout = setTimeout(checkImage, 100);

    return () => clearTimeout(timeout);
  }, [svgPath]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError();
    }
  };

  if (!svgPath) {
    if (showFallback) {
      return (
        <div
          className={`flex items-center justify-center ${className}`}
          style={{ width: size, height: size }}
        >
          <span className="text-xs font-semibold">{techStackName.charAt(0)}</span>
        </div>
      );
    }
    return null;
  }

  if (hasError && showFallback) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-xs font-semibold">{techStackName.charAt(0)}</span>
      </div>
    );
  }

  if (hasError) {
    return null;
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {isLoading && <Skeleton className="absolute inset-0 rounded-md" />}
      <img
        ref={imgRef}
        src={svgPath}
        alt={techStackName}
        width={size}
        height={size}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
}
