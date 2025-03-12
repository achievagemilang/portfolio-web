import Hero from "@/components/home/hero"
import Experience from "@/components/home/experience"
import Projects from "@/components/home/projects"
import BlogPosts from "@/components/home/blog-posts"

// Create fallback data for when contentlayer hasn't generated content yet
const fallbackExperiences = [
  {
    _id: "exp-1",
    company: "Example Company",
    position: "Senior Developer",
    startDate: "2021-01-01",
    endDate: "2023-01-01",
    description: "Led development of key features for the company's flagship product.",
    achievements: [
      "Increased site performance by 40% through code optimization",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Mentored junior developers and conducted code reviews",
    ],
  },
  {
    _id: "exp-2",
    company: "Previous Company",
    position: "Frontend Developer",
    startDate: "2018-06-01",
    endDate: "2020-12-31",
    description: "Developed responsive web applications using React and TypeScript.",
    achievements: [
      "Built reusable component library used across multiple projects",
      "Implemented state management using Redux",
      "Collaborated with design team to improve UX",
    ],
  },
]

// Add more fallback posts to ensure we have enough to test scrolling
const fallbackPosts = [
  {
    _id: "post-1",
    title: "Getting Started with Next.js",
    date: "2023-01-15",
    excerpt: "Learn how to build modern web applications with Next.js",
    slug: "getting-started-with-nextjs",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    _id: "post-2",
    title: "Styling with Tailwind CSS",
    date: "2023-02-10",
    excerpt: "How to use Tailwind CSS to create beautiful, responsive designs",
    slug: "styling-with-tailwind-css",
    tags: ["CSS", "Tailwind", "Design"],
  },
  {
    _id: "post-3",
    title: "Server Components in Next.js",
    date: "2023-03-05",
    excerpt: "Understanding the power of React Server Components in Next.js",
    slug: "server-components-nextjs",
    tags: ["Next.js", "React", "Server Components"],
  },
  {
    _id: "post-4",
    title: "Building a Portfolio with Next.js",
    date: "2023-04-20",
    excerpt: "Step-by-step guide to creating a developer portfolio with Next.js",
    slug: "portfolio-with-nextjs",
    tags: ["Next.js", "Portfolio", "Career"],
  },
  {
    _id: "post-5",
    title: "Introduction to TypeScript",
    date: "2023-05-15",
    excerpt: "Why TypeScript is becoming essential for modern web development",
    slug: "intro-to-typescript",
    tags: ["TypeScript", "JavaScript", "Web Development"],
  },
]

export default function Home() {
  // Try to import from contentlayer, but use fallback data if it fails
  const experiences = fallbackExperiences
  const recentPosts = fallbackPosts

  try {
    // Dynamic import to avoid build errors
    // This is a workaround and won't actually work at runtime
    // We'll use the fallback data instead
    // In a real app, you'd set up proper content files and Contentlayer config
  } catch (error) {
    console.log("Using fallback data for experiences and posts")
  }

  // Featured projects (limit to 4)
  const featuredProjects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform built with Next.js and Stripe integration.",
      image: "/placeholder.svg?height=300&width=500",
      link: "https://github.com/yourusername/ecommerce-platform",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      image: "/placeholder.svg?height=300&width=500",
      link: "https://github.com/yourusername/task-management",
      tags: ["React", "Firebase", "TypeScript", "Redux"],
    },
    {
      id: 3,
      title: "AI Image Generator",
      description: "An AI-powered image generation tool using OpenAI's DALL-E API.",
      image: "/placeholder.svg?height=300&width=500",
      link: "https://github.com/yourusername/ai-image-generator",
      tags: ["Next.js", "OpenAI", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 4,
      title: "Personal Finance Dashboard",
      description: "A dashboard for tracking personal finances and investments.",
      image: "/placeholder.svg?height=300&width=500",
      link: "https://github.com/yourusername/finance-dashboard",
      tags: ["React", "D3.js", "TypeScript", "Material UI"],
    },
  ]

  return (
    <main className="min-h-screen">
      <Hero />
      <Experience experiences={experiences} />
      <Projects projects={featuredProjects} />
      <BlogPosts posts={recentPosts} />
    </main>
  )
}

