'use client';

import ProjectCard from '@/components/projects/project-card';
import type { Project } from '@/content-config';
import { useLanguage } from '@/context/language-context';
import { useMemo } from 'react';

interface RelatedProjectsProps {
  currentProjectId: number;
  projects: Project[];
}

// Simple seeded random number generator (Mulberry32)
function seededRandom(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function RelatedProjects({ currentProjectId, projects }: RelatedProjectsProps) {
  const { t } = useLanguage();
  // Filter out current project and get 2 related projects using deterministic selection
  const relatedProjects = useMemo(() => {
    const otherProjects = projects.filter((p) => p.id !== currentProjectId);

    // Create a seeded random generator using currentProjectId
    const random = seededRandom(currentProjectId * 9973 + 7919);

    // Fisher-Yates shuffle with seeded random
    const shuffled = [...otherProjects];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 2);
  }, [currentProjectId, projects]);

  return (
    <div className="mt-24 pt-12 border-t border-border">
      <h2 className="text-3xl font-bold mb-8">{t.project.related.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedProjects.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard project={project} variant="featured" />
          </div>
        ))}
      </div>
    </div>
  );
}
