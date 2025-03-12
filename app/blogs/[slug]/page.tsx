import { notFound } from "next/navigation"
import { format } from "date-fns"
import type { Metadata } from "next"

// Fallback posts data
const fallbackPosts = [
  {
    _id: "post-1",
    title: "Getting Started with Next.js",
    date: "2023-01-15",
    excerpt: "Learn how to build modern web applications with Next.js",
    slug: "getting-started-with-nextjs",
    tags: ["Next.js", "React", "Web Development"],
    body: {
      code: "This is a placeholder for the MDX content. In a real application, this would be rendered using the MDX component.",
    },
  },
  {
    _id: "post-2",
    title: "Styling with Tailwind CSS",
    date: "2023-02-10",
    excerpt: "How to use Tailwind CSS to create beautiful, responsive designs",
    slug: "styling-with-tailwind-css",
    tags: ["CSS", "Tailwind", "Design"],
    body: {
      code: "This is a placeholder for the MDX content. In a real application, this would be rendered using the MDX component.",
    },
  },
  {
    _id: "post-3",
    title: "Server Components in Next.js",
    date: "2023-03-05",
    excerpt: "Understanding the power of React Server Components in Next.js",
    slug: "server-components-nextjs",
    tags: ["Next.js", "React", "Server Components"],
    body: {
      code: "This is a placeholder for the MDX content. In a real application, this would be rendered using the MDX component.",
    },
  },
]

export async function generateStaticParams() {
  return fallbackPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = fallbackPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Achieva Gemilang`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = fallbackPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // In a real app with Contentlayer properly set up, you'd use:
  // const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="container mx-auto py-12">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 mb-8 text-muted-foreground">
          <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          <div className="flex gap-2">
            {post.tags?.map((tag) => (
              <span key={tag} className="bg-muted px-2 py-1 rounded-md text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Placeholder for MDX content */}
        <div className="p-4 border border-border rounded-md bg-muted/20">
          <p>This is a placeholder for the blog post content.</p>
          <p>In a real application with Contentlayer properly set up, this would render the MDX content of the post.</p>
        </div>
      </article>
    </div>
  )
}

