'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function AnimatedContactForm() {
  const { t } = useLanguage();
  return (
    <motion.div variants={fadeInUp}>
      <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-2 text-center">
        {t.about.contactForm.title}
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground text-center mb-6 max-w-md mx-auto"
      >
        {t.about.contactForm.descriptionPart1}
        <br />
        <span className="italic">{t.about.contactForm.descriptionPart2}</span>
      </motion.p>

      {/* Contact Buttons */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto gap-2 group transition-all duration-300 !text-foreground"
          >
            <a
              href="mailto:achievafuturagemilang@gmail.com"
              className="flex items-center justify-center w-full"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              {t.about.contactForm.email}
            </a>
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Button asChild className="w-full sm:w-auto gap-2 group">
            <a
              href="https://www.linkedin.com/in/achieva-futura-gemilang/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full"
            >
              <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              {t.about.contactForm.linkedin}
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
