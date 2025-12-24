'use client';

import SearchBar from '@/components/molecule/search-bar';
import ProjectCard from '@/components/projects/project-card';
import ProjectCardSkeleton from '@/components/projects/project-card-skeleton';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import PageTransition from '@/components/util/page-transition';
import { projectList } from '@/constant/constant';
import { getTechStackInfo } from '@/lib/tech-stack-logos';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

const TECH_STACKS = ['Go', 'Spring Boot', 'Flutter', 'Next.js', 'React'] as const;

export default function ProjectClientPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const allProjects = useMemo(() => {
    return [...projectList].sort((a, b) => {
      const yearDiff = (b.year || 0) - (a.year || 0);
      if (yearDiff !== 0) return yearDiff;
      return b.id - a.id;
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique years from projects
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    allProjects.forEach((project) => {
      if (project.year) years.add(project.year);
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    let filtered = allProjects;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      );
    }

    // Year filter
    if (selectedYears.length > 0) {
      filtered = filtered.filter((project) => project.year && selectedYears.includes(project.year));
    }

    // Tech stack filter
    if (selectedTechStacks.length > 0) {
      filtered = filtered.filter((project) => {
        return project.tags.some((tag) => {
          const techInfo = getTechStackInfo(tag);
          if (!techInfo) return false;

          // Check if tag matches any selected tech stack
          return selectedTechStacks.some((selected) => {
            // Handle Next.js and React separately
            if (selected === 'Next.js') {
              return techInfo.name === 'Next.js';
            }
            if (selected === 'React') {
              return techInfo.name === 'React';
            }
            // For other tech stacks, exact match
            return techInfo.name === selected;
          });
        });
      });
    }

    return filtered;
  }, [searchQuery, selectedYears, selectedTechStacks, allProjects]);

  const projectsPerPage = 6;
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const currentPage = Math.min(Math.max(parseInt(page, 10), 1), totalPages || 1);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    if (query === searchQuery) return;
    setIsLoading(true);
    setSearchQuery(query);
    window.history.replaceState({}, '', '?page=1');
    setTimeout(() => setIsLoading(false), 300);
  };

  const toggleYear = (year: number) => {
    setIsLoading(true);
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
    window.history.replaceState({}, '', '?page=1');
    setTimeout(() => setIsLoading(false), 300);
  };

  const toggleTechStack = (tech: string) => {
    setIsLoading(true);
    setSelectedTechStacks((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
    window.history.replaceState({}, '', '?page=1');
    setTimeout(() => setIsLoading(false), 300);
  };

  const clearFilters = () => {
    setIsLoading(true);
    setSearchQuery('');
    setSelectedYears([]);
    setSelectedTechStacks([]);
    window.history.replaceState({}, '', '?page=1');
    setTimeout(() => setIsLoading(false), 300);
  };

  const hasActiveFilters = searchQuery || selectedYears.length > 0 || selectedTechStacks.length > 0;

  return (
    <PageTransition>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">All Projects</h1>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 w-full">
              <SearchBar onSearch={handleSearch} type="projects" initialQuery={searchQuery} />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3">
              {/* Year Filter Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Year
                    {selectedYears.length > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                        {selectedYears.length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Filter by Year</h4>
                      <div className="space-y-2">
                        {availableYears.map((year) => (
                          <div key={year} className="flex items-center space-x-2">
                            <Checkbox
                              id={`year-${year}`}
                              checked={selectedYears.includes(year)}
                              onCheckedChange={() => toggleYear(year)}
                            />
                            <Label
                              htmlFor={`year-${year}`}
                              className="text-sm font-normal cursor-pointer flex-1"
                            >
                              {year}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Tech Stack Filter Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Tech Stack
                    {selectedTechStacks.length > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                        {selectedTechStacks.length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Filter by Tech Stack</h4>
                      <div className="space-y-2">
                        {TECH_STACKS.map((tech) => (
                          <div key={tech} className="flex items-center space-x-2">
                            <Checkbox
                              id={`tech-${tech}`}
                              checked={selectedTechStacks.includes(tech)}
                              onCheckedChange={() => toggleTechStack(tech)}
                            />
                            <Label
                              htmlFor={`tech-${tech}`}
                              className="text-sm font-normal cursor-pointer flex-1"
                            >
                              {tech}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
            </motion.div>
          ) : filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <p className="text-lg text-muted-foreground">
                No projects found matching your criteria.
              </p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        {totalProjects > 0 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {currentPage > 1 && (
              <Link
                href={`?page=${currentPage - 1}`}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md border bg-foreground hover:bg-gray-300 text-background transition-colors shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </Link>
            )}
            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`?page=${pageNum}`}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-primary text-secondary'
                      : 'text-secondary-700 hover:bg-primary/10'
                  }`}
                >
                  {pageNum}
                </Link>
              ))}
            </div>
            {currentPage < totalPages && (
              <Link
                href={`?page=${currentPage + 1}`}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md border bg-foreground hover:bg-gray-300 text-background transition-colors shadow-sm"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
