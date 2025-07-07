'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, ExternalLink, BookOpen, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 border-t border-border">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo on the left */}
        <div className="mb-4 md:mb-0">
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
            <span className="font-bold">Achieva Gemilang</span>
          </Link>
        </div>

        {/* Copyright in the middle */}
        <div className="text-sm text-muted-foreground mb-4 md:mb-0">
          © 2025 Achieva Futura Gemilang. All rights reserved.
        </div>

        {/* Social links on the right */}
        <div className="flex items-center space-x-4">
          <a
            href="https://linkedin.com/in/achieva-futura-gemilang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://instagram.com/achieva17_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Line"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://github.com/achievagemilang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="mailto:achievafuturagemilang@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://medium.com/@achievafuturagemilang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Medium"
          >
            <BookOpen size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
