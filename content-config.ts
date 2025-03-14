export interface Post {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags?: string[];
  mdxSource?: any;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  achievements: string[];
  logoUrl: string;
  website: string;
  category: 'professional' | 'education' | 'volunteer';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  featured?: boolean;
}
