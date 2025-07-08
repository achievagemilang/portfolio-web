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
      <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-6 text-center">
        Get in Touch
      </motion.h2>
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
