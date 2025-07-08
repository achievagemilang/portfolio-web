'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, Calendar } from 'lucide-react';
import type { Experience } from '@/content-config';
import { useState } from 'react';
import { Briefcase, GraduationCap, Heart } from 'lucide-react';

interface ExperienceProps {
  experiences: Experience[];
}

function groupExperiencesById(experiences: Experience[]) {
  const groups: Record<string, Experience[]> = {};
  experiences.forEach((exp) => {
    if (!groups[exp._id]) groups[exp._id] = [];
    groups[exp._id].push(exp);
  });
  // Sort each group by startDate descending
  Object.values(groups).forEach((group) =>
    group.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  );
  return Object.values(groups);
}

export default function Experience({ experiences }: ExperienceProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState<'professional' | 'education' | 'volunteer'>(
    'professional'
  );

  const filteredExperiences = experiences
    .filter((exp) => exp.category === activeFilter)
    .sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

  const groupedExperiences = groupExperiencesById(filteredExperiences);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="py-16 bg-muted/50"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container px-4 sm:px-6">
        <motion.h2
          className="text-3xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Experiences
        </motion.h2>

        {/* Category Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 px-2 sm:px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button
            variant={activeFilter === 'professional' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('professional')}
            className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1.5 sm:py-2"
          >
            <Briefcase size={12} className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Professional</span>
            <span className="xs:hidden">Work</span>
          </Button>
          <Button
            variant={activeFilter === 'education' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('education')}
            className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1.5 sm:py-2"
          >
            <GraduationCap size={12} className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Education</span>
            <span className="xs:hidden">Edu</span>
          </Button>
          <Button
            variant={activeFilter === 'volunteer' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('volunteer')}
            className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1.5 sm:py-2"
          >
            <Heart size={12} className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Org/Volunteering</span>
            <span className="xs:hidden">Volunteer</span>
          </Button>
        </motion.div>

        <motion.div
          className="relative max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {/* Timeline line - animate it growing */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -ml-px md:ml-0"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.5 }}
          />

          {groupedExperiences.map((group, groupIdx) =>
            group.length === 1 ? (
              <motion.div
                key={group[0]._id}
                variants={item}
                className="relative mb-12 pl-12 md:pl-0"
              >
                {/* Timeline dot - with pulse animation */}
                <motion.div
                  className="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full bg-transparent -ml-1.5 md:-ml-1.5"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
                  transition={{ delay: 0.2 + groupIdx * 0.2, duration: 0.5 }}
                />
                <Card
                  className={`transition-all duration-300 hover:scale-[1.03] hover:shadow-lg border-0 shadow-md overflow-hidden ${
                    groupIdx % 2 === 0 ? 'md:ml-auto md:mr-16' : 'md:mr-auto md:ml-16'
                  }`}
                  style={{ minHeight: '320px' }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4 mb-1 flex-wrap sm:flex-nowrap">
                      {group[0].logoUrl && (
                        <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-md border border-border/30 bg-background p-1">
                          <Image
                            src={group[0].logoUrl || '/placeholder.svg'}
                            alt={`${group[0].company} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl line-clamp-2">{group[0].company}</CardTitle>
                        <div className="text-lg font-medium text-muted-foreground mt-0.5 line-clamp-1">
                          {group[0].description}
                        </div>
                        <div className="flex items-center mt-1.5 text-sm text-muted-foreground">
                          <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                          <span>
                            {format(new Date(group[group.length - 1].startDate), 'MMM yyyy')} -
                            {group[0].endDate
                              ? format(new Date(group[0].endDate), ' MMM yyyy')
                              : ' Present'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="relative pl-8">
                      {/* Timeline line */}
                      <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />
                      {group.map((exp, idx) => (
                        <div key={exp.position} className="relative mb-6">
                          {/* Timeline dot */}
                          <div className="absolute left-[-8px] top-2 w-2 h-2 rounded-full bg-primary" />
                          <div className="pl-4">
                            <div className="font-semibold">{exp.position}</div>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                              {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
                            </div>
                            <ul className="list-disc pl-5 space-y-1">
                              {exp.achievements.map((ach, i) => (
                                <li key={i} className="text-sm">
                                  {ach}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>

                    {group[0].website && (
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-primary hover:text-primary/80 hover:bg-primary/5 -mr-2"
                          onClick={() => window.open(group[0].website, '_blank')}
                        >
                          Visit company <ExternalLink size={14} className="flex-shrink-0" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key={group[0]._id}
                variants={item}
                className="relative mb-12 pl-12 md:pl-0"
              >
                {/* Timeline dot - with pulse animation */}
                <motion.div
                  className="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full bg-transparent -ml-1.5 md:-ml-1.5"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
                  transition={{ delay: 0.2 + groupIdx * 0.2, duration: 0.5 }}
                />

                <Card
                  className={`transition-all duration-300 hover:scale-[1.03] hover:shadow-lg border-0 shadow-md overflow-hidden ${
                    groupIdx % 2 === 0 ? 'md:ml-auto md:mr-16' : 'md:mr-auto md:ml-16'
                  }`}
                  style={{ minHeight: '320px' }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4 mb-1 flex-wrap sm:flex-nowrap">
                      {group[0].logoUrl && (
                        <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-md border border-border/30 bg-background p-1">
                          <Image
                            src={group[0].logoUrl || '/placeholder.svg'}
                            alt={`${group[0].company} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl line-clamp-2">{group[0].company}</CardTitle>
                        <div className="text-lg font-medium text-muted-foreground mt-0.5 line-clamp-1">
                          {group[0].description}
                        </div>
                        <div className="flex items-center mt-1.5 text-sm text-muted-foreground">
                          <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                          <span>
                            {format(new Date(group[group.length - 1].startDate), 'MMM yyyy')} -
                            {group[0].endDate
                              ? format(new Date(group[0].endDate), ' MMM yyyy')
                              : ' Present'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="relative pl-8">
                      {/* Timeline line */}
                      <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />
                      {group.map((exp, idx) => (
                        <div key={exp.position} className="relative mb-6">
                          {/* Timeline dot */}
                          <div className="absolute left-[-8px] top-2 w-2 h-2 rounded-full bg-primary" />
                          <div className="pl-4">
                            <div className="font-semibold">{exp.position}</div>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                              {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
                            </div>
                            <ul className="list-disc pl-5 space-y-1">
                              {exp.achievements.map((ach, i) => (
                                <li key={i} className="text-sm">
                                  {ach}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>

                    {group[0].website && (
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-primary hover:text-primary/80 hover:bg-primary/5 -mr-2"
                          onClick={() => window.open(group[0].website, '_blank')}
                        >
                          Visit company <ExternalLink size={14} className="flex-shrink-0" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
