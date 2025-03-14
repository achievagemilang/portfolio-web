'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Post } from '@/content-config';

interface BlogPostsProps {
  posts: Post[];
}

export default function BlogPosts({ posts }: BlogPostsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Handle hydration by only running client-side logic after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Check if we can scroll left
    setShowLeftArrow(container.scrollLeft > 10); // Add a small threshold

    // Check if we can scroll right
    // Add a small buffer (10px) to account for rounding errors
    const canScrollRight =
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10;

    // Force show right arrow if we have more than 2 posts and we're at the start
    const forceShowRightArrow = posts.length > 2 && container.scrollLeft < 10;

    setShowRightArrow(canScrollRight || forceShowRightArrow);

    // Debug info to console
    console.log({
      scrollLeft: container.scrollLeft,
      scrollWidth: container.scrollWidth,
      clientWidth: container.clientWidth,
      canScrollRight,
      showRightArrow: canScrollRight || forceShowRightArrow,
    });
  };

  useEffect(() => {
    if (!mounted) return;

    const container = scrollContainerRef.current;
    if (container) {
      // Force an initial check after a short delay to ensure content is rendered
      setTimeout(checkScrollPosition, 100);

      // Add scroll event listener
      container.addEventListener('scroll', checkScrollPosition);

      // Check after images/content might have loaded
      window.addEventListener('resize', checkScrollPosition);

      // Multiple checks to ensure we catch any layout changes
      const timers = [
        setTimeout(checkScrollPosition, 500),
        setTimeout(checkScrollPosition, 1000),
        setTimeout(checkScrollPosition, 2000),
      ];

      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [mounted, posts.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const cardWidth = 330; // approximate width of card + gap

      if (direction === 'left') {
        current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }

      // Update arrow visibility after scrolling
      setTimeout(checkScrollPosition, 500);
    }
  };

  const shouldAlwaysShowArrows = posts.length > 2;

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2 + i * 0.1,
      },
    }),
  };

  return (
    <motion.section
      ref={sectionRef}
      className="py-16 bg-muted/50"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.div
          className="flex justify-between items-center mb-8"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-3xl font-bold">Latest Writes</h2>
          <Button asChild variant="outline">
            <Link href="/blogs">View All Writes</Link>
          </Button>
        </motion.div>

        <div className="relative">
          {/* Left arrow - show if we can scroll left or if we're forcing arrows */}
          {mounted && (showLeftArrow || shouldAlwaysShowArrows) && (
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm shadow-md"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                disabled={!showLeftArrow}
              >
                <ChevronLeft size={24} />
              </Button>
            </motion.div>
          )}

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <Card className="min-w-[300px] max-w-[350px] h-[400px] flex-shrink-0 snap-start transition-all duration-200 hover:scale-[1.02] hover:shadow-lg flex flex-col">
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readingTime} min read</span>
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>

                    <p className="text-muted-foreground mb-6 line-clamp-3 text-sm flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-muted px-3 py-1 rounded-md text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-center rounded-md hover:bg-muted/50 mt-auto"
                    >
                      <Link href={`/blogs/${post.slug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Right arrow - show if we can scroll right or if we're forcing arrows */}
          {mounted && (showRightArrow || shouldAlwaysShowArrows) && (
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm shadow-md"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                disabled={!showRightArrow && mounted}
              >
                <ChevronRight size={24} />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Fallback pagination dots for mobile or when JS is disabled */}
        <motion.div
          className="flex justify-center mt-4 gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
        >
          {posts.length > 3 &&
            Array.from({ length: Math.ceil(posts.length / 2) }).map((_, i) => (
              <button
                key={i}
                className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 focus:bg-muted-foreground/50"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = 330; // approximate width of card + gap
                    scrollContainerRef.current.scrollTo({
                      left: i * cardWidth * 2,
                      behavior: 'smooth',
                    });
                    setTimeout(checkScrollPosition, 500);
                  }
                }}
              />
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
