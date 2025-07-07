'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import SocialLinks from '@/components/shared/social-links';

export default function Hero() {
  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 dark:to-primary/5" />

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
              <Image
                src="/profile-hero.jpeg?height=256&width=256"
                alt="Achieva Futura Gemilang"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Hi, I'm{' '}
            <TypeAnimation
              sequence={['Achieva Gemilang']}
              wrapper="span"
              speed={40}
              className="text-red-800"
              cursor={true}
            />
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            A life-long learner <span className="text-red-800">Software Engineer</span> with a
            business-driven mindset, blending technical expertise with strategic thinking.
          </motion.p>

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
                Resume/CV
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">About Me</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
