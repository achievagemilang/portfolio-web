'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/blogs/blog-card';
import SearchBar from '@/components/blogs/search-bar';
import TagFilter from '@/components/blogs/tag-filter';
import { Button } from '@/components/ui/button';
import { Post } from '@/content-config';

interface PostsProps {
  posts: Post[];
}

export default function BlogClientPage({ posts }: PostsProps) {
  // Use fallback posts data
  const allPosts = posts;
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags from posts
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags || [])));

  // Filter posts based on search query and selected tag
  useEffect(() => {
    let result = allPosts;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by tag
    if (selectedTag) {
      result = result.filter((post) => post.tags?.includes(selectedTag));
    }

    setFilteredPosts(result);
  }, [searchQuery, selectedTag, allPosts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">All Writes</h1>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <SearchBar onSearch={handleSearch} />
        <TagFilter tags={allTags} onTagSelect={handleTagSelect} />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No posts found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
