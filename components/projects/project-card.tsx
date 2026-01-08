'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ImageWithSkeleton from '@/components/ui/image-with-skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/context/language-context';
import { TechStackBadge, getTechStackInfo } from '@/lib/tech-stack-logos';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
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
  slug?: string;
}

interface ProjectCardProps {
  project: Project;
  isLoading?: boolean;
  variant?: 'default' | 'featured';
}

export default function ProjectCard({
  project,
  isLoading = false,
  variant = 'default',
}: ProjectCardProps) {
  const { t, language } = useLanguage();
  const [showAllTags, setShowAllTags] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) {
    return <ProjectCardSkeleton />;
  }

  const techStackTags = project.tags.filter((tag) => getTechStackInfo(tag) !== null);
  const otherTags = project.tags.filter((tag) => getTechStackInfo(tag) === null);
  const hasMoreTechTags = techStackTags.length > 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Gradient border glow effect */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/50 via-red-500/50 to-orange-500/50 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
      />

      <Card className="relative overflow-hidden h-full flex flex-col bg-background/80 backdrop-blur-xl border-border/40 rounded-2xl shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/20 p-0">
        {/* Image Container */}
        <div
          className={`relative w-full overflow-hidden flex-shrink-0 ${variant === 'featured' ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}
        >
          <ImageWithSkeleton
            src={project.image || '/placeholder.svg'}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Year badge with premium styling */}
          {project.year && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute top-4 right-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-500 rounded-full blur-md opacity-40" />
                <div className="relative px-4 py-1.5 rounded-full bg-background/95 backdrop-blur-md border border-border/50 shadow-xl">
                  <span className="text-xs font-bold text-foreground tracking-wider">
                    {project.year}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <CardContent className="pt-5 px-6 flex-grow flex flex-col">
          {/* Title with gradient on hover */}
          <motion.h3
            className={`font-bold mb-2 tracking-tight bg-gradient-to-r from-foreground to-foreground bg-clip-text transition-all duration-300 group-hover:from-primary group-hover:to-red-500 group-hover:text-transparent ${variant === 'featured' ? 'text-2xl' : 'text-xl'}`}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <p
            className={`text-muted-foreground/90 leading-relaxed mb-5 line-clamp-3 ${variant === 'featured' ? 'text-base' : 'text-sm'}`}
          >
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {techStackTags.slice(0, 3).map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TechStackBadge tag={tag} />
              </motion.div>
            ))}

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

            {hasMoreTechTags && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => setShowAllTags(!showAllTags)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/80 hover:bg-muted border border-border/50 transition-all duration-200 text-xs font-medium hover:border-primary/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showAllTags ? (
                        <>
                          <ChevronUp className="h-3 w-3" />
                          <span>{t.project.card.less}</span>
                        </>
                      ) : (
                        <>
                          <span>+{techStackTags.length - 3}</span>
                          <ChevronDown className="h-3 w-3" />
                        </>
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-popover/95 backdrop-blur-sm">
                    <p className="text-xs">
                      {showAllTags
                        ? t.project.card.showLess
                        : t.project.card.showMore.replace('{count}', String(techStackTags.length))}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {otherTags.map((tag) => (
              <span
                key={tag}
                className="bg-muted/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-border/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>

        {/* Footer with buttons */}
        <CardFooter className="px-6 pb-6 pt-4">
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <Button
              asChild
              className="group/btn flex-1 relative overflow-hidden bg-gradient-to-r from-primary via-primary to-red-600 hover:from-primary/90 hover:via-red-600 hover:to-red-600 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 rounded-xl h-11"
            >
              <Link href={`/${language}/projects/${project.slug}`}>
                <span className="font-medium">{t.project.card.viewDetails}</span>
                <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group/btn flex-1 bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 rounded-xl h-11"
            >
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <span className="font-medium">{t.project.card.visitProject}</span>
                <ExternalLink className="h-4 w-4 ml-1 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-3" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
