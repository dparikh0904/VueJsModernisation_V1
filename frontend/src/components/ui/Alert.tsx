import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'success' | 'info' | 'warning' | 'danger';
  children: React.ReactNode;
  dismissible?: boolean;
  icon?: boolean;
  className?: string;
}

const alertConfig = {
  success: {
    bg: 'bg-success',
    icon: 'ni ni-like-2',
    label: 'Success!',
  },
  info: {
    bg: 'bg-info',
    icon: 'ni ni-bell-55',
    label: 'Info!',
  },
  warning: {
    bg: 'bg-warning',
    icon: 'ni ni-bell-55',
    label: 'Warning!',
  },
  danger: {
    bg: 'bg-danger',
    icon: 'ni ni-support-16',
    label: 'Danger!',
  },
};

export function Alert({
  variant = 'success',
  children,
  dismissible = true,
  icon = true,
  className,
}: AlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const config = alertConfig[variant];

  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 text-white rounded',
        config.bg,
        dismissible && 'pr-12',
        className
      )}
      role="alert"
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span className="alert-inner--icon">
            <i className={config.icon}></i>
          </span>
        )}
        <span className="alert-inner--text">
          <strong className="font-bold">{config.label}</strong> {children}
        </span>
      </div>
      {dismissible && (
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 text-xl font-bold"
          onClick={() => setVisible(false)}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
}
