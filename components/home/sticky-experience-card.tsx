'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageWithSkeleton from '@/components/ui/image-with-skeleton';
import type { Experience } from '@/content-config';
import { useLanguage } from '@/context/language-context';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronDown, ExternalLink } from 'lucide-react';
import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface StickyExperienceCardProps {
  experiences: Experience[];
  index: number;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

export default function StickyExperienceCard({
  experiences,
  index,
  isExpanded,
  onToggle,
}: StickyExperienceCardProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  // Use the first experience for company-level details
  const mainExp = experiences[0];
  // Use the last experience for the start date (since they are sorted DESC)
  const oldestExp = experiences[experiences.length - 1];

  return (
    <motion.div
      ref={cardRef}
      className="mb-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group transition-all duration-300 shadow-lg border border-border/50 bg-card overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            {mainExp.logoUrl && (
              <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden rounded-xl border-2 border-border/50 bg-background p-2 shadow-sm group-hover:border-primary/30 transition-colors">
                <ImageWithSkeleton
                  src={mainExp.logoUrl || '/placeholder.svg'}
                  alt={`${mainExp.company} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl font-bold mb-1.5 leading-tight">
                    {mainExp.company}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar size={14} className="flex-shrink-0" />
                    <span className="font-medium">
                      {format(new Date(oldestExp.startDate), 'MMM yyyy')} -{' '}
                      {mainExp.endDate
                        ? format(new Date(mainExp.endDate), 'MMM yyyy')
                        : t.home.experience.present}
                    </span>
                  </div>
                  <p
                    className={`text-sm text-muted-foreground transition-all duration-300 ${
                      isExpanded ? 'line-clamp-none' : 'line-clamp-3'
                    }`}
                  >
                    {mainExp.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0 h-9 w-9 p-0 rounded-lg hover:bg-muted self-center"
                  onClick={() => onToggle(mainExp._id)}
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  <motion.div
                    animate={{
                      rotate: isExpanded ? 180 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                filter: 'blur(0px)',
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <CardContent className="pt-0 pb-6">
                <div className="space-y-6">
                  {experiences.map((exp, idx) => (
                    <div
                      key={`${exp._id}-${exp.startDate}`}
                      className="relative pl-6 border-l-2 border-primary/20"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-sm" />
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-1">
                            {exp.position}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={12} className="flex-shrink-0" />
                              <span>
                                {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                                {exp.endDate
                                  ? format(new Date(exp.endDate), 'MMM yyyy')
                                  : t.home.experience.present}
                              </span>
                            </div>
                            {exp.type && (
                              <span className="inline-flex items-center rounded-md bg-secondary/50 px-2 py-0.5 text-xs text-secondary-foreground ring-1 ring-inset ring-secondary/50">
                                {exp.type}
                              </span>
                            )}
                          </div>
                        </div>
                        <ul className="space-y-2.5">
                          {exp.achievements.map((ach, i) => (
                            <li
                              key={i}
                              className="text-sm leading-relaxed text-muted-foreground flex items-start gap-2.5"
                            >
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60 mt-2" />
                              <div className="flex-1 prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown
                                  components={{
                                    p: ({ children }) => <span>{children}</span>,
                                    strong: ({ children }) => (
                                      <strong className="font-semibold text-foreground">
                                        {children}
                                      </strong>
                                    ),
                                    em: ({ children }) => <em className="italic">{children}</em>,
                                    a: ({ href, children }) => (
                                      <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline font-medium"
                                      >
                                        {children}
                                      </a>
                                    ),
                                    ul: ({ children }) => (
                                      <ul className="list-disc list-inside space-y-1 my-2">
                                        {children}
                                      </ul>
                                    ),
                                    ol: ({ children }) => (
                                      <ol className="list-decimal list-inside space-y-1 my-2">
                                        {children}
                                      </ol>
                                    ),
                                    li: ({ children }) => <li className="text-sm">{children}</li>,
                                  }}
                                >
                                  {ach}
                                </ReactMarkdown>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {mainExp.website && (
                  <div className="flex justify-end mt-6 pt-4 border-t border-border/50">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                      onClick={() => window.open(mainExp.website, '_blank')}
                    >
                      {t.home.experience.visitWebsite}
                      <ExternalLink size={14} className="flex-shrink-0" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
