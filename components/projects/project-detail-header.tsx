'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Eye } from 'lucide-react';
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

          {/* Stats - grid layout for mobile, flex for desktop */}
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-4">
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{year}</span>
            </div>

            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{readTime}</span>
            </div>

            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 text-sm">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{viewCount.toLocaleString()}</span>
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
    </div>
  );
}
