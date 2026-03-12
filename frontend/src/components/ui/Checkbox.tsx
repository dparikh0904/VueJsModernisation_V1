import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, disabled, ...props }, ref) => {
    return (
      <div className={cn('custom-control custom-checkbox', className)}>
        <label className={cn('flex items-center cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className="custom-control-input sr-only peer"
            {...props}
          />
          <span
            className={cn(
              'w-5 h-5 border-2 border-gray-300 rounded mr-3 flex items-center justify-center transition-colors',
              'peer-checked:bg-primary-500 peer-checked:border-primary-500',
              'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2'
            )}
          >
            <svg
              className="w-3 h-3 text-white hidden peer-checked:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
