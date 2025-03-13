'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/about/contact-form';

export default function AnimatedContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      <ContactForm />
    </motion.div>
  );
}
