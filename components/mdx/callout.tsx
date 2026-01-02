import { ReactNode } from 'react';

interface CalloutProps {
  emoji?: string;
  type?: 'info' | 'warning' | 'danger';
  children: ReactNode;
}

export default function Callout({ emoji = '💡', type = 'info', children }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200',
    warning:
      'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-200',
    danger:
      'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200',
  };

  return (
    <div className={`my-6 flex gap-3 rounded-lg border p-4 ${styles[type]}`}>
      <div className="select-none text-xl self-center">{emoji}</div>
      <div className="prose-sm max-w-none flex-1">{children}</div>
    </div>
  );
}
