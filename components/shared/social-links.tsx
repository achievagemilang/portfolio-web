import { BookOpen, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { JSX } from 'react';

type SocialLink = {
  href: string;
  label: string;
  icon: JSX.Element;
  external?: boolean;
};

export default function SocialLinks() {
  const socialLinks: SocialLink[] = [
    {
      href: 'https://github.com/achievagemilang',
      label: 'GitHub',
      icon: <Github size={18} />,
      external: true,
    },
    {
      href: 'https://linkedin.com/in/achieva-futura-gemilang',
      label: 'LinkedIn',
      icon: <Linkedin size={18} />,
      external: true,
    },
    {
      href: 'mailto:achievafuturagemilang@gmail.com',
      label: 'Email',
      icon: <Mail size={18} />,
    },
    {
      href: 'https://line.me/ti/p/thelbr_1',
      label: 'LINE',
      icon: (
        <span className="flex items-center justify-center h-4 w-4 font-bold text-xs">LINE</span>
      ),
      external: true,
    },
    {
      href: 'https://medium.com/@achievafuturagemilang',
      label: 'Medium',
      icon: <BookOpen size={18} />,
      external: true,
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-wrap justify-center gap-2">
        {socialLinks.map((link) => (
          <Tooltip key={link.label}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" asChild>
                <a
                  href={link.href}
                  aria-label={link.label}
                  {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {link.icon}
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
