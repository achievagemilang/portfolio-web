'use client';

import Callout from '@/components/mdx/callout';
import MobileTableOfContents from '@/components/projects/mobile-table-of-contents';
import ProjectDetailHeader from '@/components/projects/project-detail-header';
import RelatedProjects from '@/components/projects/related-projects';
import TableOfContents from '@/components/projects/table-of-contents';
import type { Project } from '@/content-config';
import { useViewCount } from '@/hooks/use-view-count';
import { TechStackBadge } from '@/lib/tech-stack-logos';
import { motion } from 'framer-motion';

interface ProjectContentProps {
  project: Project;
  allProjects: Project[];
}

export default function ProjectContent({ project, allProjects }: ProjectContentProps) {
  // Fetch and increment view count from Redis
  const { viewCount, isLoading: isViewCountLoading } = useViewCount(project.slug || '', {
    initialCount: project.viewCount || 0,
    incrementOnMount: true,
  });

  const sections = [
    { id: 'tldr', label: 'TL;DR' },
    { id: 'description', label: 'Description' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'features', label: 'Features' },
    { id: 'lessons-learned', label: 'Lessons Learned' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <ProjectDetailHeader
        title={project.title}
        author={
          project.author || {
            name: 'Achieva Futura Gemilang',
            avatar: '/AGLogoRevamped.png',
          }
        }
        year={project.year || new Date().getFullYear()}
        readTime={project.readTime || '5 min read'}
        viewCount={viewCount || project.viewCount || 0}
        isViewCountLoading={isViewCountLoading}
        tags={project.tags}
        image={project.image}
        url={project.link}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* TL;DR Section - Always render */}
          <section id="tldr" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary">#</span> TL;DR
            </h2>
            {project.tldr && project.tldr.length > 0 ? (
              <Callout emoji="🚀" type="info">
                <ul className="list-disc pl-5 space-y-2">
                  {project.tldr.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Callout>
            ) : (
              <Callout emoji="📝" type="info">
                <p className="text-muted-foreground italic">Key highlights coming soon...</p>
              </Callout>
            )}
          </section>

          {/* Description Section */}
          <section id="description" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary">#</span> Description
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground whitespace-pre-line">
              {project.fullDescription || project.description}
            </div>
          </section>

          {/* Tech Stack Section - Smaller badges */}
          <section id="tech-stack" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-primary">#</span> Tech Stack
            </h2>
            {project.tags && project.tags.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {project.tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2 text-center"
                  >
                    <TechStackBadge tag={tag} />
                    <span className="font-medium text-xs text-muted-foreground">{tag}</span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-lg border bg-muted/30 text-center">
                <p className="text-muted-foreground italic">Tech stack details coming soon...</p>
              </div>
            )}
          </section>

          {/* Features Section - Always render */}
          <section id="features" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary">#</span> Features
            </h2>
            {project.features && project.features.length > 0 ? (
              <ul className="grid grid-cols-1 gap-3">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-transparent hover:border-primary/20 transition-colors"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="p-6 rounded-lg border bg-muted/30 text-center">
                <p className="text-muted-foreground italic">Feature list coming soon...</p>
              </div>
            )}
          </section>

          {/* Lessons Learned Section - Always render */}
          <section id="lessons-learned" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary">#</span> Lessons Learned
            </h2>
            {project.lessonsLearned && project.lessonsLearned.length > 0 ? (
              <div className="space-y-4">
                {project.lessonsLearned.map((lesson, index) => (
                  <Callout key={index} emoji="💡" type="warning">
                    {lesson}
                  </Callout>
                ))}
              </div>
            ) : (
              <Callout emoji="🎓" type="warning">
                <p className="text-muted-foreground italic">Lessons and insights coming soon...</p>
              </Callout>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 hidden lg:block">
          <TableOfContents sections={sections} projectUrl={project.link} />
        </div>
      </div>

      <RelatedProjects currentProjectId={project.id} projects={allProjects} />

      {/* Mobile floating ToC */}
      <MobileTableOfContents sections={sections} projectUrl={project.link} />
    </div>
  );
}
