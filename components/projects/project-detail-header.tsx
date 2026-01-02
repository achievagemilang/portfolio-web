'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Eye } from 'lucide-react';
import Image from 'next/image';

interface ProjectDetailHeaderProps {
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  year: number;
  readTime: string;
  viewCount: number;
  isViewCountLoading?: boolean;
  tags: string[];
  image: string;
  url?: string;
}

export default function ProjectDetailHeader({
  title,
  author,
  year,
  readTime,
  viewCount,
  isViewCountLoading = false,
  tags,
  image,
  url,
}: ProjectDetailHeaderProps) {
  return (
    <div className="space-y-8 mb-12">
      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {/* Author - always on its own row */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-border shadow-sm">
              <Image src={author.avatar} alt={author.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-semibold">{author.name}</span>
              <span className="text-muted-foreground text-xs">Author</span>
            </div>
          </div>

          {/* Stats - flex wrap layout for better mobile */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground whitespace-nowrap">{year}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground whitespace-nowrap">{readTime}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm">
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              {isViewCountLoading ? (
                <Skeleton className="h-3.5 w-8" />
              ) : (
                <span className="text-muted-foreground whitespace-nowrap">
                  {viewCount.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image container with responsive sizing */}
      <div className="w-full lg:px-12 xl:px-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-border"
        >
          <Image src={image} alt={title} fill className="object-cover" priority />
        </motion.div>
      </div>

      {/* Mobile-only Visit Project button */}
      {url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:hidden mx-8"
        >
          <Button asChild className="w-full group">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <span>Visit Project</span>
              <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:scale-110" />
            </a>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
