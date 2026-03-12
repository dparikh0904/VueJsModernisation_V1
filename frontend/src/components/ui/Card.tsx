import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  shadow?: boolean;
}

export function Card({ className, children, hover, shadow, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden',
        hover && 'transition-transform hover:-translate-y-1',
        shadow && 'shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}