'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedContactForm from './animated-contact-form';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AnimatedAboutContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
    >
      <div>
        <motion.h1
          variants={fadeInUp}
          className="text-4xl flex justify-center lg:justify-start font-bold mb-6"
        >
          About Me
        </motion.h1>

        {/* Profile picture */}
        <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20"
          >
            <Image
              src="/new_pas_foto.jpeg?height=160&width=160"
              alt="Your Name"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={stagger} className="prose dark:prose-invert max-w-none">
          <motion.p variants={fadeInUp} className="text-lg mb-4">
            Hi, I'm Cip, a Software Engineer with a business-driven mindset, blending technical
            expertise with strategic thinking to build scalable, user-centric solutions.
          </motion.p>

          <motion.p variants={fadeInUp} className="mb-4">
            With a strong foundation in mobile development (Flutter, Kotlin, Swift) and full-stack
            technologies (Next.js, Go, Spring Boot, Django, etc.), I've built and delivered various
            projects like Citizen Journalism, BikunTracker Mobile, Questify, and more!
          </motion.p>

          <motion.p variants={fadeInUp} className="mb-4">
            I LOVE learning especially self improvement stuffs. In tech niche, I'm currently dive in
            learning more about AI agents, Blockchain, and WEB3 to elevate my products.
            Occasionally, I write blogs/threads to share my perspective and takeaways from my
            learning journey just to document them in public. As they say, the most effective
            learning technique is arguably learning in public 🚀.
          </motion.p>

          <motion.p variants={fadeInUp} className="mb-4">
            When I'm not coding, you can find me singing, reading, or gaming.
          </motion.p>

          <motion.p variants={fadeInUp} className="mb-4">
            Feel free to reach out if you'd like to collaborate or just chat!
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-6 mb-8">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="https://drive.google.com/file/d/1NNrYkp3NKc_8hQmRa0P4T0Ctt3Y-7QxN/view?usp=sharing">
                  Resume/CV
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link
                  href="https://linktr.ee/achieva.futura"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My Socials
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp}>
        <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-6">
          Get in Touch
        </motion.h2>
        <AnimatedContactForm />
      </motion.div>
    </motion.div>
  );
}
