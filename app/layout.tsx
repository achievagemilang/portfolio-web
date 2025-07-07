import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/layout/footer';

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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
