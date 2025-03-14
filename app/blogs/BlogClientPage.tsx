'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import BlogCard from '@/components/blogs/blog-card';
import SearchBar from '@/components/molecule/search-bar';
import TagFilter from '@/components/molecule/tag-filter';
import { Button } from '@/components/ui/button';
import { Post } from '@/content-config';

interface PostsProps {
  posts: Post[];
}

export default function BlogClientPage({ posts }: PostsProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const allPosts = posts;
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags || [])));

  useEffect(() => {
    let result = allPosts;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedTag) {
      result = result.filter((post) => post.tags?.includes(selectedTag));
    }

    setFilteredPosts(result);
  }, [searchQuery, selectedTag, allPosts]);

  const postsPerPage = 6;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPage = Math.min(Math.max(parseInt(page, 10), 1), totalPages || 1);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    if (query === searchQuery) return;

    setSearchQuery(query);
    window.history.replaceState({}, '', '?page=1');
  };

  const handleTagSelect = (tag: string | null) => {
    if (tag === selectedTag) return;

    setSelectedTag(tag);
    window.history.replaceState({}, '', '?page=1');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    window.history.replaceState({}, '', '?page=1');
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">All Writes</h1>

      <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
      <div className="mb-8 mt-4 flex flex-col md:flex-row gap-4">
        <TagFilter tags={allTags} onTagSelect={handleTagSelect} initialTag={selectedTag} />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No writes found matching your criteria.</p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>

          {totalPosts > 0 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {currentPage > 1 && (
                <Link
                  href={`?page=${currentPage - 1}`}
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-md border bg-foreground hover:bg-gray-300 text-background transition-colors shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </Link>
              )}
              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`?page=${pageNum}`}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary text-secondary'
                        : 'text-secondary-700 hover:bg-primary/10'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}
              </div>
              {currentPage < totalPages && (
                <Link
                  href={`?page=${currentPage + 1}`}
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-md border bg-foreground hover:bg-gray-300 text-background transition-colors shadow-sm"
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
