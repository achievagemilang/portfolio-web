import Hero from '@/components/home/hero';
import Experience from '@/components/home/experience';
import Projects from '@/components/home/projects';
import BlogPosts from '@/components/home/blog-posts';
import { fallbackPosts } from './blogs/BlogClientPage';
import PageTransition from '@/components/util/page-transition';
import { getAllPosts } from '@/lib/mdx';
import { experiencesList, projectList } from '@/constant/constant';

// Create fallback data for when contentlayer hasn't generated content yet

export default async function Home() {
  // Try to import from contentlayer, but use fallback data if it fails
  const experiences = experiencesList;

  const posts = await getAllPosts();

  // If we have actual posts, use them; otherwise fall back to our hardcoded ones
  const recentPosts = posts.length > 0 ? posts : fallbackPosts;

  try {
    // Dynamic import to avoid build errors
    // This is a workaround and won't actually work at runtime
    // We'll use the fallback data instead
    // In a real app, you'd set up proper content files and Contentlayer config
  } catch (error) {
    console.log('Using fallback data for experiences and posts');
  }

  // Featured projects (limit to 4)
  const featuredProjects = projectList.slice(0, 4);

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
