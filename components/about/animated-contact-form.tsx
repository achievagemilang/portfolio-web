'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/about/contact-form';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function AnimatedContactForm() {
  return (
    <motion.div variants={fadeInUp}>
      <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-2 text-center">
        Get in Touch
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground text-center mb-6 max-w-md mx-auto"
      >
        <a
          href="https://www.linkedin.com/in/achieva-futura-gemilang/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary/80 font-bold hover:underline hover:underline-offset-4 transition-all duration-200"
        >
          Direct message me on LinkedIn
        </a>{' '}
        or fill the form below.
        <br />
        <a className="italic">I'll get back to you as soon as possible.</a>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <ContactForm />
      </motion.div>
    </motion.div>
  );
}
