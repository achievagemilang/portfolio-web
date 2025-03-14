'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface TagFilterProps {
  tags: string[];
  onTagSelect: (tag: string | null) => void;
  initialTag?: string | null;
}

export default function TagFilter({ tags, onTagSelect, initialTag }: TagFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag ?? null);

  // Add this useEffect to sync with parent state changes
  useEffect(() => {
    setSelectedTag(initialTag ?? null);
  }, [initialTag]);

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);
    onTagSelect(newTag);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTag === tag ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleTagClick(tag)}
          className="transition-all duration-200"
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
