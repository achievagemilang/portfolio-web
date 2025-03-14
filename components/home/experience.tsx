'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, Calendar } from 'lucide-react';

interface Experience {
  _id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  achievements: string[];
  logoUrl: string;
  website: string;
}

interface ExperienceProps {
  experiences: Experience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

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
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Experiences
        </motion.h2>

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

          {experiences.map((experience, index) => (
            <motion.div
              key={experience._id}
              variants={item}
              className="relative mb-12 pl-12 md:pl-0"
            >
              {/* Timeline dot - with pulse animation */}
              <motion.div
                className="absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-primary -ml-2 md:-ml-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
                transition={{ delay: 0.2 + index * 0.2, duration: 0.5 }}
              />

              <Card
                className={`transition-all duration-300 hover:scale-[1.03] hover:shadow-lg border-0 shadow-md overflow-hidden ${
                  index % 2 === 0 ? 'md:ml-auto md:mr-12' : 'md:mr-auto md:ml-12'
                }`}
                style={{ minHeight: '320px' }} // Set a consistent minimum height
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4 mb-1 flex-wrap sm:flex-nowrap">
                    {experience.logoUrl && (
                      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-md border border-border/30 bg-background p-1">
                        <Image
                          src={experience.logoUrl || '/placeholder.svg'}
                          alt={`${experience.company} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl line-clamp-2">{experience.position}</CardTitle>
                      <div className="text-lg font-medium text-muted-foreground mt-0.5 line-clamp-1">
                        {experience.company}
                      </div>
                      <div className="flex items-center mt-1.5 text-sm text-muted-foreground">
                        <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                        <span>
                          {format(new Date(experience.startDate), 'MMM yyyy')} -
                          {experience.endDate
                            ? format(new Date(experience.endDate), ' MMM yyyy')
                            : ' Present'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="mb-4 text-muted-foreground line-clamp-3">
                    {experience.description}
                  </p>
                  <motion.ul
                    className="list-disc pl-5 space-y-2 mb-4 max-h-[120px] overflow-y-auto"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.3,
                        },
                      },
                    }}
                  >
                    {experience.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                        }}
                        className="text-sm"
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {experience.website && (
                    <div className="flex justify-end mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-primary hover:text-primary/80 hover:bg-primary/5 -mr-2"
                        onClick={() => window.open(experience.website, '_blank')}
                      >
                        Visit company <ExternalLink size={14} className="flex-shrink-0" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
