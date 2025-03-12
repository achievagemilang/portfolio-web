"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface TagFilterProps {
  tags: string[]
  onTagSelect?: (tag: string | null) => void
}

export default function TagFilter({ tags, onTagSelect }: TagFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const handleTagClick = (tag: string) => {
    let newTag: string | null = tag

    if (selectedTag === tag) {
      // If clicking the already selected tag, deselect it
      setSelectedTag(null)
      newTag = null
    } else {
      setSelectedTag(tag)
    }

    if (onTagSelect) {
      onTagSelect(newTag)
    } else {
      // In a real implementation, this would filter posts based on the tag
      console.log("Selected tag:", newTag)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTag === tag ? "default" : "outline"}
          size="sm"
          onClick={() => handleTagClick(tag)}
          className="transition-all duration-200"
        >
          {tag}
        </Button>
      ))}
    </div>
  )
}

