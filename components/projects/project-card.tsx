'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ImageWithSkeleton from '@/components/ui/image-with-skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TechStackBadge, getTechStackInfo } from '@/lib/tech-stack-logos';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import ProjectCardSkeleton from './project-card-skeleton';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  year?: number;
}

interface ProjectCardProps {
  project: Project;
  isLoading?: boolean;
}

export default function ProjectCard({ project, isLoading = false }: ProjectCardProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  // Show skeleton when explicitly in loading state
  // Note: ImageWithSkeleton handles individual image loading states internally
  if (isLoading) {
    return <ProjectCardSkeleton />;
  }

  // Separate tech stack tags from other tags
  const techStackTags = project.tags.filter((tag) => getTechStackInfo(tag) !== null);
  const otherTags = project.tags.filter((tag) => getTechStackInfo(tag) === null);

  // Show first 3 tech stack tags, rest are collapsed
  const visibleTechTags = showAllTags ? techStackTags : techStackTags.slice(0, 3);
  const hasMoreTechTags = techStackTags.length > 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:scale-[1.03] hover:shadow-lg p-0 pb-8">
        <div className="relative w-full h-48 overflow-hidden group flex-shrink-0">
          <ImageWithSkeleton
            src={project.image || '/placeholder.svg'}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {project.year && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg"
            >
              <span className="text-xs font-semibold text-foreground tracking-wide">
                {project.year}
              </span>
            </motion.div>
          )}
        </div>
        <CardContent className="pt-6 px-6 flex-grow flex flex-col items-start">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto content-start">
            {/* Tech stack logos - always show first 3 */}
            {techStackTags.slice(0, 3).map((tag) => (
              <TechStackBadge key={tag} tag={tag} />
            ))}

            {/* Collapsible additional tech stack tags */}
            <AnimatePresence>
              {showAllTags && hasMoreTechTags && (
                <>
                  {techStackTags.slice(3).map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -5 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.04,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <TechStackBadge tag={tag} />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Expand/Collapse button */}
            {hasMoreTechTags && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => setShowAllTags(!showAllTags)}
                      className="flex items-center justify-center gap-1 px-2 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {showAllTags ? (
                        <>
                          <motion.div
                            initial={{ rotate: -180 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <ChevronUp className="h-3 w-3" />
                          </motion.div>
                          <span>Show less</span>
                        </>
                      ) : (
                        <>
                          <span>+{techStackTags.length - 3} more</span>
                          <motion.div
                            initial={{ rotate: 180 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <ChevronDown className="h-3 w-3" />
                          </motion.div>
                        </>
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {showAllTags
                        ? `Click to collapse and show only 3 tech stacks`
                        : `Click to show all ${techStackTags.length} tech stacks`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Other tags as text (non-tech stack) */}
            {otherTags.map((tag) => (
              <span key={tag} className="bg-muted px-2 py-1 rounded-md text-xs">
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-6">
          <Button asChild>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
