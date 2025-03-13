import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function getPostBySlug(slug: string) {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Serialize the MDX content for use with MDXRemote
    const mdxSource = await serialize(content);

    return {
      _id: slug,
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      mdxSource,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory does not exist');
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);

    const posts = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx$/, '');
          const post = await getPostBySlug(slug);
          return post;
        })
    );

    // Filter out any null values and sort by date
    return posts
      .filter((post) => post !== null)
      .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime());
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}
