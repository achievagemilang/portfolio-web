import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home | Achieva Futura Gemilang',
  description: 'Professional portfolio showcasing projects, experiences, and blog posts',
  icons: {
    icon: [
      {
        url: '/AGLogoRevamped.png',
        href: '/AGLogoRevamped.png',
      },
    ],
    apple: {
      url: '/AGLogoRevamped.png',
      href: '/AGLogoRevamped.png',
    },
    shortcut: {
      url: '/AGLogoRevamped.png',
      href: '/AGLogoRevamped.png',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Analytics />
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
