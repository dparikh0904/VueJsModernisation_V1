import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'default';
  children: React.ReactNode;
  rounded?: boolean;
  circle?: boolean;
  icon?: string;
  className?: string;
}

const variantClasses = {
  primary: 'bg-primary-500 text-white',
  success: 'bg-success text-white',
  danger: 'bg-danger text-white',
  warning: 'bg-warning text-white',
  info: 'bg-info text-white',
  default: 'bg-default text-white',
};

export function Badge({
  variant = 'primary',
  children,
  rounded = false,
  circle = false,
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-3 py-1 text-xs font-bold uppercase',
        variantClasses[variant],
        rounded && 'rounded-full',
        circle && 'rounded-full w-8 h-8 p-0',
        !rounded && !circle && 'rounded',
        className
      )}
    >
      {icon && <i className={cn(icon, children && 'mr-1')}></i>}
      {children}
    </span>
  );
}
