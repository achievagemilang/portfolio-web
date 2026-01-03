'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ExternalLink, List, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MobileTableOfContentsProps {
  sections: { id: string; label: string }[];
  projectUrl?: string;
}

export default function MobileTableOfContents({
  sections,
  projectUrl,
}: MobileTableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

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

  const handleSectionClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden fixed bottom-24 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            {isOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-left">On this page</SheetTitle>
          </SheetHeader>

          <div className="space-y-6 overflow-y-auto h-full pb-20">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className={cn(
                      'block w-full text-left py-3 px-4 text-sm rounded-xl transition-all duration-200 border-l-2',
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary border-primary font-medium'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground border-transparent'
                    )}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>

            {projectUrl && (
              <div className="pt-4 border-t border-border">
                <Button asChild className="w-full group">
                  <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                    <span>Visit Project</span>
                    <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:scale-110" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
