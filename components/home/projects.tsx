'use client';

import ProjectCard from '@/components/projects/project-card';
import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  year?: number;
}

interface ProjectsProps {
  projects: Project[];
}

import { useLanguage } from '@/context/language-context';

export default function Projects({ projects }: ProjectsProps) {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="py-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.div
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold">{t.home.projects.title}</h2>
          <Button asChild variant="outline">
            <Link href="/projects">{t.home.projects.viewAll}</Link>
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="featured" />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
