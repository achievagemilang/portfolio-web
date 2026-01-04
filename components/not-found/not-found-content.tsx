'use client';

import { GoBackButton } from '@/components/not-found/go-back-button';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundContent() {
  const { t, language } = useLanguage();

  return (
    <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 dark:to-primary/5" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number with animation */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t.notFound.title}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
              {t.notFound.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="group">
              <Link href={`/${language}`}>
                <Home className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
                {t.notFound.goHome}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <Link href={`/${language}/blogs`}>
                <Search className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                {t.notFound.browseBlog}
              </Link>
            </Button>
            <GoBackButton />
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center gap-2 opacity-50">
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
