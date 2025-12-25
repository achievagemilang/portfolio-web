/**
 * Repository configuration - factory functions for creating repository instances
 */

import { ProjectService } from '@/application/services/project.service';
import { FileSystemBlogPostRepository } from '../repositories/file-system-blog-post.repository';
import { InMemoryProjectRepository } from '../repositories/in-memory-project.repository';

/**
 * Create blog post repository
 */
export function createBlogPostRepository(): FileSystemBlogPostRepository {
  return new FileSystemBlogPostRepository();
}

/**
 * Create project repository
 */
export function createProjectRepository(): InMemoryProjectRepository {
  return new InMemoryProjectRepository();
}

/**
 * Create project service with repository dependency
 */
export function createProjectService(): ProjectService {
  const repository = createProjectRepository();
  return new ProjectService(repository);
}
