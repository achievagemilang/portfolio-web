import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"

interface Post {
  _id: string
  title: string
  date: string
  excerpt: string
  slug: string
  tags?: string[]
}

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:scale-[1.03] hover:shadow-lg">
      <CardContent className="pt-6 flex-grow">
        <div className="text-sm text-muted-foreground mb-2">{format(new Date(post.date), "MMMM d, yyyy")}</div>
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map((tag) => (
            <span key={tag} className="bg-muted px-2 py-1 rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <Link href={`/blogs/${post.slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

