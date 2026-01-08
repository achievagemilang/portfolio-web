import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Post } from '@/content-config';
import { useLanguage } from '@/context/language-context';
import { format } from 'date-fns';
import { Clock } from 'lucide-react'; // Import clock icon
import Link from 'next/link';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { t, language } = useLanguage();
  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:scale-[1.03] hover:shadow-lg">
      <CardContent className="pt-6 flex-grow">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>
              {post.readingTime} {t.blog.card.minRead}
            </span>
          </span>
        </div>
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
          <Link href={`/${language}/blogs/${post.slug}`}>{t.blog.card.readMore}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
