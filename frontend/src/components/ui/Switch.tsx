import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, disabled, ...props }, ref) => {
    return (
      <div className={cn('custom-control custom-switch', className)}>
        <label className={cn('flex items-center cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
          <div className="relative">
            <input
              type="checkbox"
              ref={ref}
              disabled={disabled}
              className="sr-only peer"
              {...props}
            />
            <div
              className={cn(
                'w-11 h-6 bg-gray-300 rounded-full transition-colors',
                'peer-checked:bg-primary-500',
                'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2'
              )}
            ></div>
            <div
              className={cn(
                'absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                'peer-checked:translate-x-5'
              )}
            ></div>
          </div>
          {label && <span className="ml-3 text-sm text-gray-700">{label}</span>}
        </label>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
