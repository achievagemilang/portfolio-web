import Hero from '@/components/home/hero';
import Experience from '@/components/home/experience';
import Projects from '@/components/home/projects';
import BlogPosts from '@/components/home/blog-posts';
import PageTransition from '@/components/util/page-transition';
import { getAllPosts } from '@/lib/mdx';
import { experiencesList, projectList } from '@/constant/constant';

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
