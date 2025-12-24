// Map tech stack names to their SVG file names in public/techstack
export const techStackSvgMap: Record<string, string> = {
  Go: 'Go.svg',
  'Spring Boot': 'Spring.svg',
  Flutter: 'Flutter.svg',
  'Next.js': 'Next.js.svg',
  React: 'React.svg',
  Dart: 'Dart.svg',
  TypeScript: 'TypeScript.svg',
  JavaScript: 'JavaScript.svg',
  Java: 'Java.svg',
  Python: 'Python.svg',
  Kotlin: 'Kotlin.svg',
  NestJS: 'Nest.js.svg',
  Prisma: 'Prisma.svg',
  PostgreSQL: 'PostgresSQL.svg',
  GCP: 'Google-Cloud.svg',
  Firebase: 'Firebase.svg',
  ExpressJS: 'Express.svg',
  Tailwind: 'Tailwind-CSS.svg',
  Django: 'Django.svg',
  Grafana: 'Grafana.svg',
  // Additional mappings for variations
  Golang: 'Go.svg',
  SpringBoot: 'Spring.svg',
  'Spring-Boot': 'Spring.svg',
  NextJS: 'Next.js.svg',
  Next: 'Next.js.svg',
  ReactJS: 'React.svg',
  Express: 'Express.svg',
  'Express.js': 'Express.svg',
  Postgres: 'PostgresSQL.svg',
  'Google Cloud': 'Google-Cloud.svg',
  'Google Cloud Platform': 'Google-Cloud.svg',
  'Tailwind CSS': 'Tailwind-CSS.svg',
  'Nest.js': 'Nest.js.svg',
};

/**
 * Get the SVG file path for a tech stack name
 * @param techStackName - The tech stack name
 * @returns The SVG file path or null if not found
 */
export function getTechStackSvgPath(techStackName: string): string | null {
  const normalized = techStackName.trim();

  // Direct match
  if (techStackSvgMap[normalized]) {
    return `/techstack/${techStackSvgMap[normalized]}`;
  }

  // Case-insensitive match
  const lower = normalized.toLowerCase();
  for (const [key, value] of Object.entries(techStackSvgMap)) {
    if (key.toLowerCase() === lower) {
      return `/techstack/${value}`;
    }
  }

  // Partial match (e.g., "Spring Boot" matches "Spring")
  for (const [key, value] of Object.entries(techStackSvgMap)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return `/techstack/${value}`;
    }
  }

  return null;
}
