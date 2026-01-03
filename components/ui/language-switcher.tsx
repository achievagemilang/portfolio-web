'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/language-context';
import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLang: 'en' | 'id') => {
    if (!pathname) return;

    // Split pathname to replace the language segment
    const segments = pathname.split('/');
    // segments[0] is empty, segments[1] is the locale (en/id)
    segments[1] = newLang;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle Language" className="rounded-full">
          <span className="text-lg">{language === 'en' ? '🇺🇸' : '🇮🇩'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage('en')} className="gap-2 cursor-pointer">
          <span className="text-lg">🇺🇸</span>
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('id')} className="gap-2 cursor-pointer">
          <span className="text-lg">🇮🇩</span>
          <span>Indonesian</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
