"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { format } from "date-fns"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Post {
  _id: string
  title: string
  date: string
  excerpt: string
  slug: string
  tags?: string[]
}

interface BlogPostsProps {
  posts: Post[]
}

export default function BlogPosts({ posts }: BlogPostsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true) // Default to true to show right arrow initially
  const [mounted, setMounted] = useState(false)

  // Handle hydration by only running client-side logic after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current
    if (!container) return

    // Check if we can scroll left
    setShowLeftArrow(container.scrollLeft > 10) // Add a small threshold

    // Check if we can scroll right
    // Add a small buffer (10px) to account for rounding errors
    const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 10

    // Force show right arrow if we have more than 2 posts and we're at the start
    const forceShowRightArrow = posts.length > 2 && container.scrollLeft < 10

    setShowRightArrow(canScrollRight || forceShowRightArrow)

    // Debug info to console
    console.log({
      scrollLeft: container.scrollLeft,
      scrollWidth: container.scrollWidth,
      clientWidth: container.clientWidth,
      canScrollRight,
      showRightArrow: canScrollRight || forceShowRightArrow,
    })
  }

  useEffect(() => {
    if (!mounted) return

    const container = scrollContainerRef.current
    if (container) {
      // Force an initial check after a short delay to ensure content is rendered
      setTimeout(checkScrollPosition, 100)

      // Add scroll event listener
      container.addEventListener("scroll", checkScrollPosition)

      // Check after images/content might have loaded
      window.addEventListener("resize", checkScrollPosition)

      // Multiple checks to ensure we catch any layout changes
      const timers = [
        setTimeout(checkScrollPosition, 500),
        setTimeout(checkScrollPosition, 1000),
        setTimeout(checkScrollPosition, 2000),
      ]

      return () => {
        container.removeEventListener("scroll", checkScrollPosition)
        window.removeEventListener("resize", checkScrollPosition)
        timers.forEach((timer) => clearTimeout(timer))
      }
    }
  }, [mounted, posts.length])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const cardWidth = 330 // approximate width of card + gap

      if (direction === "left") {
        current.scrollBy({ left: -cardWidth, behavior: "smooth" })
      } else {
        current.scrollBy({ left: cardWidth, behavior: "smooth" })
      }

      // Update arrow visibility after scrolling
      setTimeout(checkScrollPosition, 500)
    }
  }

  // Always show navigation arrows if we have more than 2 posts
  const shouldAlwaysShowArrows = posts.length > 2

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
          <Button asChild variant="outline">
            <Link href="/blogs">View All Posts</Link>
          </Button>
        </div>

        <div className="relative">
          {/* Left arrow - show if we can scroll left or if we're forcing arrows */}
          {mounted && (showLeftArrow || shouldAlwaysShowArrows) && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm shadow-md"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                disabled={!showLeftArrow}
              >
                <ChevronLeft size={24} />
              </Button>
            </div>
          )}

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch", // Improve scroll on iOS
            }}
          >
            {posts.map((post) => (
              <Card
                key={post._id}
                className="min-w-[300px] max-w-[350px] flex-shrink-0 snap-start transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              >
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map((tag) => (
                      <span key={tag} className="bg-muted px-2 py-1 rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link href={`/blogs/${post.slug}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Right arrow - show if we can scroll right or if we're forcing arrows */}
          {mounted && (showRightArrow || shouldAlwaysShowArrows) && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm shadow-md"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                disabled={!showRightArrow && mounted}
              >
                <ChevronRight size={24} />
              </Button>
            </div>
          )}
        </div>

        {/* Fallback pagination dots for mobile or when JS is disabled */}
        <div className="flex justify-center mt-4 gap-2">
          {posts.length > 3 &&
            Array.from({ length: Math.ceil(posts.length / 2) }).map((_, i) => (
              <button
                key={i}
                className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 focus:bg-muted-foreground/50"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = 330 // approximate width of card + gap
                    scrollContainerRef.current.scrollTo({
                      left: i * cardWidth * 2,
                      behavior: "smooth",
                    })
                    setTimeout(checkScrollPosition, 500)
                  }
                }}
              />
            ))}
        </div>
      </div>
    </section>
  )
}

