import BlogPosts from '@/components/home/blog-posts';
import Experience from '@/components/home/experience';
import Hero from '@/components/home/hero';
import Projects from '@/components/home/projects';
import PageTransition from '@/components/util/page-transition';
import { experiencesList, projectList } from '@/constant/constant';
import { getAllPosts } from '@/lib/mdx';
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

  let posts = await getAllPosts();
  posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const recentPosts = posts;

  try {
    // Dynamic import to avoid build errors
    // This is a workaround and won't actually work at runtime
    // We'll use the fallback data instead
    // In a real app, you'd set up proper content files and Contentlayer config
  } catch (error) {
    console.log('Using fallback data for experiences and posts');
  }

  // Featured projects (sorted by year descending, then by ID descending if year is same, limit to 4)
  const featuredProjects = [...projectList]
    .sort((a, b) => {
      const yearDiff = (b.year || 0) - (a.year || 0);
      if (yearDiff !== 0) return yearDiff;
      return b.id - a.id;
    })
    .slice(0, 4);

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
