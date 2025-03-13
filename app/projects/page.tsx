import PageTransition from '@/components/util/page-transition';
import ProjectCard from '@/components/projects/project-card';
import type { Metadata } from 'next';
import { projectList } from '@/constant/constant';

export const metadata: Metadata = {
  title: 'Projects | Achieva Gemilang',
  description: 'Showcase of my professional projects and work',
};

export default function ProjectsPage() {
  // For now, we'll use the same hardcoded projects as on the home page
  // In a real implementation, you would fetch from contentlayer
  const projects = projectList;

  return (
    <PageTransition>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
