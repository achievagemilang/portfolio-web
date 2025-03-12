"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    } else {
      // In a real implementation, this would filter posts based on the query
      console.log("Searching for:", searchQuery)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // For immediate search as you type (optional)
    if (onSearch && value.length > 2) {
      // Only search if we have at least 3 characters
      onSearch(value)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input type="text" placeholder="Search posts..." value={searchQuery} onChange={handleChange} className="pl-10" />
    </form>
  )
}

