import BlogPosts from '@/components/home/blog-posts';
import Experience from '@/components/home/experience';
import Hero from '@/components/home/hero';
import Projects from '@/components/home/projects';
import PageTransition from '@/components/util/page-transition';
import { experiencesList } from '@/constant/constant';
import { createBlogPostRepository } from '@/infrastructure/config/repositories.config';
import { createProjectService } from '@/infrastructure/config/repositories.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Achieva Futura Gemilang',
  description: 'Home page of Achieva Futura Gemilang, a lifelong learner and software engineer.',
  openGraph: {
    title: 'Home | Achieva Futura Gemilang',
    description: 'Home page of Achieva Futura Gemilang, a lifelong learner and software engineer.',
    url: 'https://achievagemilang.live/about',
    type: 'website',
    images: [
      {
        url: 'https://achievagemilang.live/AGLogoRevamped.png',
        width: 1200,
        height: 630,
        alt: 'Achieva Futura Gemilang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | Achieva Futura Gemilang',
    description: 'Home page of Achieva Futura Gemilang, a lifelong learner and software engineer.',
    images: ['https://achievagemilang.live/AGLogoRevamped.png'],
  },
};

export default async function Home() {
  const experiences = experiencesList;

  // Use repository for blog posts
  const blogPostRepository = createBlogPostRepository();
  const posts = await blogPostRepository.getAllPosts();
  const recentPosts = posts;

  // Use service for featured projects
  const projectService = createProjectService();
  const featuredProjects = projectService.getFeaturedProjects();

  return (
    <PageTransition>
      <main className="min-h-screen">
        <Hero />
        <Experience experiences={experiences} />
        <Projects projects={featuredProjects} />
        <BlogPosts posts={recentPosts} />
      </main>
    </PageTransition>
  );
}
