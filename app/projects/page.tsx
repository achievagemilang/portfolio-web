import PageTransition from '@/components/util/page-transition';
import type { Metadata } from 'next';
import ProjectsClientPage from './ProjectClientPage';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Projects | Achieva Gemilang',
  description: 'Showcase of my professional projects and work',
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <Suspense fallback={<div>Loading posts...</div>}>
        <ProjectsClientPage />
      </Suspense>
    </PageTransition>
  );
}
