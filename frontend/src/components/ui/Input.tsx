import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="form-group">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className={cn('relative', icon && 'flex items-center')}>
          {icon && (
            <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
              <i className={cn(icon, 'text-gray-400')}></i>
            </div>
          )}
          <input
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              icon && 'pl-10',
              error && 'border-danger focus:ring-danger',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="form-errors">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';