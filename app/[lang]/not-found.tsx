import NotFoundContent from '@/components/not-found/not-found-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Achieva Futura Gemilang',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return <NotFoundContent />;
}
