'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PageTransition from '@/components/util/page-transition';
import ProjectCard from '@/components/projects/project-card';
import SearchBar from '@/components/molecule/search-bar';
import { projectList } from '@/constant/constant';
import { Button } from '@/components/ui/button';

export default function ProjectClientPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const allProjects = projectList;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = allProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    );
    setFilteredProjects(filtered);
  }, [searchQuery, allProjects]);

  const projectsPerPage = 6;
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const currentPage = Math.min(Math.max(parseInt(page, 10), 1), totalPages || 1);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    if (query === searchQuery) return;

    setSearchQuery(query);
    window.history.replaceState({}, '', '?page=1');
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">All Projects</h1>
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} type="projects" initialQuery={searchQuery} />
        </div>
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No projects found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
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
