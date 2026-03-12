import { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
  title?: string;
  children?: ReactNode;
  className?: string;
}

const variantClasses = {
  default: 'bg-default',
  primary: 'bg-primary-500',
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning',
  info: 'bg-info',
};

export function Navbar({
  variant = 'default',
  title = 'DEFAULT COLOR',
  children,
  className,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={cn(
        'w-full px-4 py-3 text-white',
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm uppercase tracking-wide">
          {title}
        </span>

        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className={cn('hidden lg:flex items-center gap-4', isOpen && 'flex')}>
          {children}
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/20">
          {children}
        </div>
      )}
    </nav>
  );
}

interface NavItemProps {
  href?: string;
  icon?: string;
  children?: ReactNode;
  className?: string;
}

export function NavItem({ href = '#', icon, children, className }: NavItemProps) {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm',
        className
      )}
    >
      {icon && <i className={icon}></i>}
      {children}
    </a>
  );
}

interface NavIconProps {
  href?: string;
  icon: string;
  className?: string;
}

export function NavIcon({ href = '#', icon, className }: NavIconProps) {
  return (
    <a
      href={href}
      className={cn(
        'text-white/90 hover:text-white transition-colors',
        className
      )}
    >
      <i className={icon}></i>
    </a>
  );
}
