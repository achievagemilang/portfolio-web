/**
 * @deprecated Use FileSystemBlogPostRepository instead
 * This file is kept for backward compatibility
 */
import { createBlogPostRepository } from '@/infrastructure/config/blog-repositories.config';

const repository = createBlogPostRepository();

/**
 * @deprecated Use repository.getAllPosts() instead
 */
export async function getAllPosts() {
  return repository.getAllPosts();
}

/**
 * @deprecated Use repository.getPostBySlug() instead
 */
export async function getPostBySlug(slug: string) {
  return repository.getPostBySlug(slug);
}
