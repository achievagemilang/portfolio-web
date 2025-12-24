import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col p-0 pb-8">
      <Skeleton className="w-full h-48 flex-shrink-0" />
      <CardContent className="pt-6 px-6 flex-grow flex flex-col">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-1" />
        <Skeleton className="h-4 w-4/6 mb-4" />
        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardContent>
      <CardFooter className="px-6">
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  );
}

