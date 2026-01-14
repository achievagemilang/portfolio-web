/**
 * Blog Repository configuration - factory functions for creating blog repository instances
 * This file should only be imported in Server Components or API routes as it may include Node.js dependencies (fs, path).
 */

import { FileSystemBlogPostRepository } from '../repositories/file-system-blog-post.repository';

/**
 * Create blog post repository
 */
export function createBlogPostRepository(): FileSystemBlogPostRepository {
  return new FileSystemBlogPostRepository();
}
