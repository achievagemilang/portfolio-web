import type { Project } from '@/content-config';
import type { IProjectRepository } from '@/domain/interfaces/project.repository.interface';
import { getTechStackInfo } from '@/lib/tech-stack-logos';

export interface ProjectFilterOptions {
  searchQuery?: string;
  selectedYears?: number[];
  selectedTechStacks?: string[];
}

/**
 * Project service - handles project-related business logic
 */
export class ProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  getAllProjects(): Project[] {
    return this.projectRepository.getAllProjects();
  }

  getFeaturedProjects(ids?: number[]): Project[] {
    return this.projectRepository.getFeaturedProjects(ids);
  }

  getProjectById(id: number): Project | undefined {
    return this.projectRepository.getProjectById(id);
  }

  /**
   * Filter and sort projects based on criteria
   */
  filterProjects(projects: Project[], options: ProjectFilterOptions): Project[] {
    let filtered = [...projects];

    // Search filter
    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      );
    }

    // Year filter
    if (options.selectedYears && options.selectedYears.length > 0) {
      filtered = filtered.filter(
        (project) => project.year && options.selectedYears!.includes(project.year)
      );
    }

    // Tech stack filter
    if (options.selectedTechStacks && options.selectedTechStacks.length > 0) {
      filtered = filtered.filter((project) => {
        return project.tags.some((tag) => {
          const techInfo = getTechStackInfo(tag);
          if (!techInfo) return false;

          // Check if tag matches any selected tech stack
          return options.selectedTechStacks!.some((selected) => {
            // Handle Next.js / React combined filter
            if (selected === 'Next.js / React') {
              return techInfo.name === 'Next.js' || techInfo.name === 'React';
            }
            // For other tech stacks, exact match
            return techInfo.name === selected;
          });
        });
      });
    }

    return filtered;
  }

  /**
   * Sort projects by year (newest first), then by ID
   */
  sortProjects(projects: Project[]): Project[] {
    return [...projects].sort((a, b) => {
      const yearDiff = (b.year || 0) - (a.year || 0);
      if (yearDiff !== 0) return yearDiff;
      return b.id - a.id;
    });
  }

  /**
   * Get unique years from projects
   */
  getAvailableYears(projects: Project[]): number[] {
    const years = new Set<number>();
    projects.forEach((project) => {
      if (project.year) years.add(project.year);
    });
    return Array.from(years).sort((a, b) => b - a);
  }

  /**
   * Paginate projects
   */
  paginateProjects(projects: Project[], page: number, itemsPerPage: number): Project[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return projects.slice(startIndex, endIndex);
  }
}

