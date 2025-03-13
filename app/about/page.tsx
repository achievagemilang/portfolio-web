import type { Metadata } from 'next';
import AnimatedAboutContent from '@/components/about/animated-about-content';

export const metadata: Metadata = {
  title: 'About | Achieva Gemilang',
  description: 'Learn more about me and my professional journey',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <AnimatedAboutContent />
    </div>
  );
}
