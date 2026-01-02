'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TableOfContentsProps {
  sections: { id: string; label: string }[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-24 space-y-4">
      <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground/80">
        On this page
      </h3>
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                'block py-2 px-3 text-sm rounded-lg transition-all duration-200 border-l-2',
                activeSection === section.id
                  ? 'bg-primary/10 text-primary border-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground border-transparent'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(section.id);
              }}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
