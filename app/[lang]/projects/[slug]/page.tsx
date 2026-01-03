import PageTransition from '@/components/util/page-transition';
import { createProjectService } from '@/infrastructure/config/repositories.config';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectContent from './project-content';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectService = createProjectService();
  const allProjects = projectService.getAllProjects();
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Achieva Futura Gemilang`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export async function generateStaticParams() {
  const projectService = createProjectService();
  const allProjects = projectService.getAllProjects();

  return allProjects
    .filter((p) => p.slug)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectService = createProjectService();
  const allProjects = projectService.getAllProjects();
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition>
      <ProjectContent project={project} allProjects={allProjects} />
    </PageTransition>
  );
}
