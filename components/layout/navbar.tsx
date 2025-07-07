'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMobile } from '@/hooks/use-mobile';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blogs', label: 'Writes' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration by only running client-side logic after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo on the left */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-10 overflow-hidden">
            <Image
              src="/AGLogoRevamped.png?height=40&width=40"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span className="hidden sm:inline-block font-bold text-xl">Achieva Gemilang</span>
        </Link>

        {/* Centered navigation links */}
        {mounted && !isMobile && (
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side elements */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          {mounted && isMobile && (
            <Button variant="ghost" size="icon" aria-label="Toggle Menu" onClick={toggleMenu}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mounted && isMobile && isMenuOpen && (
        <div className="container py-4 bg-background border-b border-border">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-2 py-2 text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-foreground bg-muted rounded-md'
                    : 'text-muted-foreground'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
