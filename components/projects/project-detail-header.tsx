'use client';

import { TechStackBadge } from '@/lib/tech-stack-logos';
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 text-muted-foreground text-sm md:text-base font-medium"
        >
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border">
              <Image src={author.avatar} alt={author.name} fill className="object-cover" />
            </div>
            <span className="text-foreground">{author.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{year}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{viewCount.toLocaleString()} views</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {tags.map((tag) => (
            <TechStackBadge key={tag} tag={tag} />
          ))}
        </motion.div>

        {url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="pt-2"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Visit Live Site
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-border"
      >
        <Image src={image} alt={title} fill className="object-cover" priority />
      </motion.div>
    </div>
  );
}
