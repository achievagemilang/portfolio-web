'use client';

import SocialLinks from '@/components/shared/social-links';
import { Button } from '@/components/ui/button';
import ImageWithSkeleton from '@/components/ui/image-with-skeleton';
import { useLanguage } from '@/context/language-context';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { TypeAnimation } from 'react-type-animation';

const ThreeDOrbit = dynamic(() => import('@/components/home/three-d-orbit'), { ssr: false });

export default function Hero() {
  const { t } = useLanguage();
  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 dark:to-primary/5" />

      <ThreeDOrbit />

      <div className="container relative z-10">
        <motion.div {...fadeInAnimation} className="max-w-3xl mx-auto text-center">
          {/* Profile picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mx-auto mb-8 relative"
          >
            <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
              <ImageWithSkeleton
                src="/profile-hero.jpeg?height=256&width=256"
                alt="Achieva Futura Gemilang"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {t.hero.greeting}{' '}
            <TypeAnimation
              sequence={['Achieva Gemilang']}
              wrapper="span"
              speed={40}
              className="text-red-800"
              cursor={true}
            />
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <ReactMarkdown
              components={{
                strong: ({ node, ...props }) => <span className="text-red-800" {...props} />,
                p: ({ node, ...props }) => <p className="inline" {...props} />,
              }}
            >
              {t.hero.description}
            </ReactMarkdown>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-8"
          >
            <SocialLinks />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <Button asChild size="lg">
              <Link href="https://drive.google.com/drive/folders/1GJxg0jQSK2cSS-4r4W7QKeSIfZIAyRKB?usp=drive_link">
                Resume
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">{t.hero.about}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
