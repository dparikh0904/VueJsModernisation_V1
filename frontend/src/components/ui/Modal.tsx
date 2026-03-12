import { useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  type?: 'default' | 'notice' | 'mini';
  gradient?: 'primary' | 'danger' | 'success' | 'warning' | 'info';
  showClose?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const gradientClasses = {
  primary: 'bg-gradient-to-br from-primary-500 to-primary-700',
  danger: 'bg-gradient-to-br from-danger to-red-700',
  success: 'bg-gradient-to-br from-success to-green-700',
  warning: 'bg-gradient-to-br from-warning to-orange-700',
  info: 'bg-gradient-to-br from-info to-cyan-700',
};

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({
  show,
  onClose,
  title,
  children,
  footer,
  type = 'default',
  gradient,
  showClose = true,
  size = 'md',
  className,
}: ModalProps) {
  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [show]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (show) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="fixed inset-0 bg-black/30 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          'relative w-full mx-4 bg-white rounded-lg shadow-xl transform transition-all',
          sizeClasses[size],
          gradient && gradientClasses[gradient],
          gradient && 'text-white',
          type === 'mini' && 'max-w-xs',
          className
        )}
      >
        {title && (
          <div className={cn('flex items-center justify-between p-4 border-b', gradient && 'border-white/20')}>
            <h5 id="modal-title" className="text-lg font-semibold">
              {title}
            </h5>
            {showClose && (
              <button
                type="button"
                className={cn(
                  'text-2xl font-bold leading-none hover:opacity-70 transition-opacity',
                  gradient ? 'text-white' : 'text-gray-500'
                )}
                onClick={onClose}
                aria-label="Close"
              >
                ×
              </button>
            )}
          </div>
        )}

        <div className="p-4">{children}</div>

        {footer && (
          <div className={cn('flex items-center justify-end gap-2 p-4 border-t', gradient && 'border-white/20')}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
