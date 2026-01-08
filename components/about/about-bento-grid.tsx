'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ImageWithSkeleton from '@/components/ui/image-with-skeleton';
import { useLanguage } from '@/context/language-context';
import { motion } from 'framer-motion';
import {
  Code2,
  Cpu,
  Gamepad2,
  Globe,
  Heart,
  Laptop,
  Library,
  Mail,
  Music2,
  Rocket,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const BentoCard = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    {children}
  </motion.div>
);

export default function AboutBentoGrid() {
  const { t } = useLanguage();
  const techStack = [
    { name: 'Go', icon: <Cpu size={14} /> },
    { name: 'Spring Boot', icon: <Code2 size={14} /> },
    { name: 'Next.js', icon: <Globe size={14} /> },
    { name: 'React', icon: <Code2 size={14} /> },
    { name: 'Flutter', icon: <Code2 size={14} /> },
    { name: 'Django', icon: <Code2 size={14} /> },
    { name: 'NestJS', icon: <Code2 size={14} /> },
    { name: 'ExpressJS', icon: <Code2 size={14} /> },
    { name: 'Kotlin', icon: <Code2 size={14} /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)] max-w-5xl mx-auto">
      {/* 1. Profile Card - Large Square/Vertical */}
      <BentoCard
        className="md:col-span-1 md:row-span-2 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950"
        delay={0.1}
      >
        <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-primary/10 shadow-xl">
          <ImageWithSkeleton
            src="/pas_foto_new.png?height=160&width=160"
            alt="Achieva Futura Gemilang"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          {t.about.bento.profile.greeting} <span className="inline-block animate-wave">👋🏻</span>
        </h1>
        <p className="text-muted-foreground mb-4">{t.about.bento.profile.role}</p>
        <div className="flex gap-2 justify-center">
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <Link href="https://linktr.ee/achieva.futura" target="_blank">
              {t.about.bento.profile.socials}
            </Link>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <Link
              href="https://drive.google.com/drive/folders/1GJxg0jQSK2cSS-4r4W7QKeSIfZIAyRKB?usp=drive_link"
              target="_blank"
            >
              {t.about.bento.profile.resume}
            </Link>
          </Button>
        </div>
      </BentoCard>

      {/* 2. Bio / Philosophy - Wide */}
      <BentoCard className="md:col-span-2 flex flex-col justify-center" delay={0.2}>
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Rocket className="h-5 w-5" />
          <h2 className="font-semibold">{t.about.bento.mission.title}</h2>
        </div>
        <p className="text-lg leading-relaxed">
          {t.about.bento.mission.descriptionPart1}
          <span className="font-semibold text-primary">
            {t.about.bento.mission.descriptionHighlight}
          </span>
          {t.about.bento.mission.descriptionPart2}
        </p>
      </BentoCard>

      {/* 3. Tech Stack - Medium */}
      <BentoCard className="md:col-span-1" delay={0.3}>
        <div className="flex items-center gap-2 mb-4 text-red-500">
          <Laptop className="h-5 w-5" />
          <h2 className="font-semibold">{t.about.bento.techStack.title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech.name} variant="secondary" className="px-2 py-1 text-xs">
              {tech.name}
            </Badge>
          ))}
        </div>
      </BentoCard>

      {/* 4. Learning Journey - Medium */}
      <BentoCard className="md:col-span-1 flex flex-col justify-between" delay={0.4}>
        <div className="flex items-center gap-2 mb-3 text-blue-500">
          <Library className="h-5 w-5" />
          <h2 className="font-semibold">{t.about.bento.learner.title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{t.about.bento.learner.description}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{t.about.bento.learner.writing}</span>
          <span>{t.about.bento.learner.sharing}</span>
          <span>{t.about.bento.learner.growing}</span>
        </div>
      </BentoCard>

      {/* 5. Hobbies - Medium */}
      <BentoCard className="md:col-span-2 flex flex-col justify-center" delay={0.5}>
        <div className="flex items-center gap-2 mb-4 text-pink-500">
          <Heart className="h-5 w-5" />
          <h2 className="font-semibold">{t.about.bento.hobbies.title}</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <Music2 className="h-8 w-8 text-indigo-500" />
            <span className="font-medium text-sm">{t.about.bento.hobbies.music}</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <Library className="h-8 w-8 text-emerald-500" />
            <span className="font-medium text-sm">{t.about.bento.hobbies.reading}</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <Gamepad2 className="h-8 w-8 text-orange-500" />
            <span className="font-medium text-sm">{t.about.bento.hobbies.gaming}</span>
          </div>
        </div>
      </BentoCard>

      {/* 6. Contact CTA - Wide */}
      <BentoCard
        className="md:col-span-1 md:col-start-3 md:row-start-2 flex flex-col items-center justify-center text-center bg-primary text-primary-foreground relative overflow-hidden group border-none"
        delay={0.6}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        <div className="relative z-10 flex flex-col items-center">
          <Mail className="h-10 w-10 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-lg mb-1">{t.about.bento.contact.title}</h3>
          <p className="text-sm opacity-90">{t.about.bento.contact.subtitle}</p>
        </div>
      </BentoCard>
    </div>
  );
}
