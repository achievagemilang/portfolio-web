'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseViewCountOptions {
  initialCount?: number;
  incrementOnMount?: boolean;
}

// Storage key prefix for tracking viewed projects/posts
const VIEWED_KEY_PREFIX = 'viewed_project_';

export function useViewCount(slug: string, options: UseViewCountOptions = {}) {
  const { initialCount = 0, incrementOnMount = true } = options;
  const [viewCount, setViewCount] = useState<number>(initialCount);
  const [isLoading, setIsLoading] = useState(true);

  // Use refs to prevent double increment in React Strict Mode
  const isIncrementingRef = useRef(false);

  // Check if already viewed in this session
  const hasViewedInSession = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(`${VIEWED_KEY_PREFIX}${slug}`) === 'true';
  }, [slug]);

  // Mark as viewed in this session
  const markAsViewed = useCallback(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(`${VIEWED_KEY_PREFIX}${slug}`, 'true');
  }, [slug]);

  const fetchViewCount = useCallback(async () => {
    try {
      const response = await fetch(`/api/views/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setViewCount(data.views);
      }
    } catch (error) {
      console.error('Failed to fetch view count:', error);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  const incrementView = useCallback(async () => {
    // Prevent double increment using session check and refs
    if (hasViewedInSession() || isIncrementingRef.current) {
      // Already viewed in this session - just fetch the count
      await fetchViewCount();
      return;
    }

    isIncrementingRef.current = true;

    try {
      const response = await fetch(`/api/views/${slug}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        setViewCount(data.views);
        markAsViewed(); // Mark as viewed in session storage
      }
    } catch (error) {
      console.error('Failed to increment view count:', error);
    } finally {
      setIsLoading(false);
      isIncrementingRef.current = false;
    }
  }, [slug, hasViewedInSession, markAsViewed, fetchViewCount]);

  useEffect(() => {
    if (incrementOnMount) {
      incrementView();
    } else {
      fetchViewCount();
    }
  }, [incrementOnMount, incrementView, fetchViewCount]);

  return { viewCount, isLoading, incrementView };
}
