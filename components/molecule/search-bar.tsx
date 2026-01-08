'use client';

import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/language-context';
import { Search, X } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  type?: string;
  initialQuery?: string; // Add this prop
}

export default function SearchBar({ onSearch, type, initialQuery = '' }: SearchBarProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch?.(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch?.('');
    window.history.replaceState({}, '', '?page=1');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={
          type === 'projects' ? t.blog.search.placeholderProjects : t.blog.search.placeholderWrites
        }
        value={searchQuery}
        onChange={handleChange}
        className="pl-10 pr-10"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
