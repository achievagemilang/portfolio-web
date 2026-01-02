'use client';

import ProjectCard from '@/components/projects/project-card';
import type { Project } from '@/content-config';

interface RelatedProjectsProps {
  currentProjectId: number;
  projects: Project[];
}

export default function RelatedProjects({ currentProjectId, projects }: RelatedProjectsProps) {
  // Filter out current project and get 2 random projects
  const otherProjects = projects.filter((p) => p.id !== currentProjectId);
  const randomProjects = otherProjects.sort(() => 0.5 - Math.random()).slice(0, 2);

  return (
    <div className="mt-24 pt-12 border-t border-border">
      <h2 className="text-3xl font-bold mb-8">Read More</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {randomProjects.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
