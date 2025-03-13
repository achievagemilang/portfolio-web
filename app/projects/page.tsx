import PageTransition from '@/components/util/page-transition';
import ProjectCard from '@/components/projects/project-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Achieva Gemilang',
  description: 'Showcase of my professional projects and work',
};

export default function ProjectsPage() {
  // For now, we'll use the same hardcoded projects as on the home page
  // In a real implementation, you would fetch from contentlayer
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js and Stripe integration.',
      image: '/placeholder.svg?height=300&width=500',
      link: 'https://github.com/yourusername/ecommerce-platform',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates.',
      image: '/placeholder.svg?height=300&width=500',
      link: 'https://github.com/yourusername/task-management',
      tags: ['React', 'Firebase', 'TypeScript', 'Redux'],
    },
    {
      id: 3,
      title: 'AI Image Generator',
      description: "An AI-powered image generation tool using OpenAI's DALL-E API.",
      image: '/placeholder.svg?height=300&width=500',
      link: 'https://github.com/yourusername/ai-image-generator',
      tags: ['Next.js', 'OpenAI', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 4,
      title: 'Personal Finance Dashboard',
      description: 'A dashboard for tracking personal finances and investments.',
      image: '/placeholder.svg?height=300&width=500',
      link: 'https://github.com/yourusername/finance-dashboard',
      tags: ['React', 'D3.js', 'TypeScript', 'Material UI'],
    },
    {
      id: 5,
      title: 'Weather Application',
      description: 'A weather forecast application with location-based services.',
      image: '/placeholder.svg?height=300&width=500',
      link: 'https://github.com/yourusername/weather-app',
      tags: ['React', 'OpenWeatherAPI', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 6,
      title: 'Social Media Dashboard',
      description: 'A dashboard for managing multiple social media accounts.',
      image: '/placeholder.svg?height=300&width=500',
      link: 'https://github.com/yourusername/social-dashboard',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SWR'],
    },
  ];

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
