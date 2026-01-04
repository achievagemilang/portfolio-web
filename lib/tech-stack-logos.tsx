'use client';

import TechStackIcon from '@/components/ui/tech-stack-icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

// Tech stack logo mapping with official URLs
export const techStackLogos: Record<
  string,
  { name: string; color: string; icon?: string; url?: string }
> = {
  Go: { name: 'Go', color: '#00ADD8', url: 'https://go.dev' },
  'Spring Boot': {
    name: 'Spring Boot',
    color: '#6DB33F',
    url: 'https://spring.io/projects/spring-boot',
  },
  Flutter: { name: 'Flutter', color: '#02569B', url: 'https://flutter.dev' },
  'Next.js': { name: 'Next.js', color: '#000000', url: 'https://nextjs.org' },
  React: { name: 'React', color: '#61DAFB', url: 'https://react.dev' },
  Dart: { name: 'Dart', color: '#0175C2', url: 'https://dart.dev' },
  TypeScript: { name: 'TypeScript', color: '#3178C6', url: 'https://www.typescriptlang.org' },
  JavaScript: {
    name: 'JavaScript',
    color: '#F7DF1E',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  Java: { name: 'Java', color: '#ED8B00', url: 'https://www.java.com' },
  Python: { name: 'Python', color: '#3776AB', url: 'https://www.python.org' },
  Kotlin: { name: 'Kotlin', color: '#7F52FF', url: 'https://kotlinlang.org' },
  NestJS: { name: 'NestJS', color: '#E0234E', url: 'https://nestjs.com' },
  Prisma: { name: 'Prisma', color: '#2D3748', url: 'https://www.prisma.io' },
  PostgreSQL: { name: 'PostgreSQL', color: '#336791', url: 'https://www.postgresql.org' },
  GCP: { name: 'Google Cloud Platform', color: '#4285F4', url: 'https://cloud.google.com' },
  Firebase: { name: 'Firebase', color: '#FFCA28', url: 'https://firebase.google.com' },
  ExpressJS: { name: 'ExpressJS', color: '#000000', url: 'https://expressjs.com' },
  Tailwind: { name: 'Tailwind', color: '#06B6D4', url: 'https://tailwindcss.com' },
  Django: { name: 'Django', color: '#092E20', url: 'https://www.djangoproject.com' },
  Grafana: { name: 'Grafana', color: '#F46800', url: 'https://grafana.com' },
  Docker: { name: 'Docker', color: '#2496ED', url: 'https://www.docker.com' },
  SPACE: {
    name: 'SPACE',
    color: '#000000',
    url: 'https://www.sea.com/products/shopee',
  },
  'Vite.js': { name: 'Vite.js', color: '#646CFF', url: 'https://vitejs.dev' },
  Vitest: { name: 'Vitest', color: '#6E9F18', url: 'https://vitest.dev' },
  k6: { name: 'k6', color: '#7D64FF', url: 'https://k6.io' },
  Lovable: { name: 'Lovable', color: '#000000', url: 'https://lovable.dev' },
  'Gemini API': { name: 'Gemini API', color: '#4285F4', url: 'https://ai.google.dev' },
  Meilisearch: { name: 'Meilisearch', color: '#FF5CAA', url: 'https://www.meilisearch.com' },
  Nginx: { name: 'Nginx', color: '#009639', url: 'https://nginx.org' },
  Caddy: { name: 'Caddy', color: '#11C928', url: 'https://caddyserver.com' },
  DigitalOcean: { name: 'DigitalOcean', color: '#0080FF', url: 'https://www.digitalocean.com' },
  Redis: { name: 'Redis', color: '#DC382D', url: 'https://redis.io' },
  WebSocket: {
    name: 'WebSocket',
    color: '#010101',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
  },
};

// Check if a tag matches a tech stack (case-insensitive, partial match)
export function getTechStackInfo(
  tag: string
): { name: string; color: string; url?: string } | null {
  const normalizedTag = tag.trim();

  // Direct match
  if (techStackLogos[normalizedTag]) {
    return techStackLogos[normalizedTag];
  }

  // Check for variations (case-insensitive)
  const lowerTag = normalizedTag.toLowerCase();

  // Go
  if (lowerTag === 'go' || lowerTag === 'golang') {
    return techStackLogos['Go'];
  }

  // Spring Boot
  if (lowerTag.includes('spring') && lowerTag.includes('boot')) {
    return techStackLogos['Spring Boot'];
  }
  if (lowerTag === 'springboot' || lowerTag === 'spring-boot') {
    return techStackLogos['Spring Boot'];
  }

  // Flutter
  if (lowerTag === 'flutter') {
    return techStackLogos['Flutter'];
  }

  // Next.js
  if (lowerTag === 'next.js' || lowerTag === 'nextjs' || lowerTag === 'next') {
    return techStackLogos['Next.js'];
  }

  // React
  if (lowerTag === 'react' || lowerTag === 'reactjs') {
    return techStackLogos['React'];
  }

  // Docker
  if (lowerTag === 'docker') {
    return techStackLogos['Docker'];
  }

  // SPACE
  if (lowerTag === 'space') {
    return techStackLogos['SPACE'];
  }

  // Vite
  if (lowerTag === 'vite') {
    return techStackLogos['Vite'];
  }

  // Vitest
  if (lowerTag === 'vitest') {
    return techStackLogos['Vitest'];
  }

  // k6
  if (lowerTag === 'k6') {
    return techStackLogos['k6'];
  }

  // Lovable
  if (lowerTag === 'lovable') {
    return techStackLogos['Lovable'];
  }

  // Gemini API
  if (lowerTag === 'gemini api' || lowerTag === 'gemini-api' || lowerTag === 'gemini') {
    return techStackLogos['Gemini API'];
  }

  // Meilisearch
  if (lowerTag === 'meilisearch' || lowerTag === 'meili-search') {
    return techStackLogos['Meilisearch'];
  }

  // Other tech stacks
  for (const [key, value] of Object.entries(techStackLogos)) {
    if (lowerTag === key.toLowerCase() || lowerTag.includes(key.toLowerCase())) {
      return value;
    }
  }

  return null;
}

// Tech stack badge component
export function TechStackBadge({ tag }: { tag: string }) {
  const techInfo = getTechStackInfo(tag);
  const [showFallback, setShowFallback] = useState(false);

  if (techInfo) {
    const badgeContent = (
      <div
        className={`relative flex items-center justify-center w-8 h-8 rounded-md overflow-hidden p-1 bg-muted/50 transition-colors ${
          techInfo.url ? 'hover:bg-muted cursor-pointer' : 'hover:bg-muted cursor-help'
        }`}
      >
        <TechStackIcon
          techStackName={techInfo.name}
          size={24}
          className="flex-shrink-0"
          showFallback={showFallback}
          onError={() => setShowFallback(true)}
        />
        {showFallback && (
          <span
            className="absolute inset-0 flex items-center justify-center text-xs font-semibold"
            style={{ color: techInfo.color }}
          >
            {techInfo.name.charAt(0)}
          </span>
        )}
      </div>
    );

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {techInfo.url ? (
              <a
                href={techInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Allow tooltip to show on hover, but navigate on click
                  e.stopPropagation();
                }}
              >
                {badgeContent}
              </a>
            ) : (
              <div>{badgeContent}</div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">{techInfo.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Fallback for non-tech stack tags
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted text-xs font-semibold cursor-help">
            {tag.charAt(0)}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{tag}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
