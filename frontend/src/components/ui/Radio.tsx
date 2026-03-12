import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, disabled, ...props }, ref) => {
    return (
      <div className={cn('custom-control custom-radio', className)}>
        <label className={cn('flex items-center cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
          <input
            type="radio"
            ref={ref}
            disabled={disabled}
            className="custom-control-input sr-only peer"
            {...props}
          />
          <span
            className={cn(
              'w-5 h-5 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center transition-colors',
              'peer-checked:border-primary-500',
              'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2'
            )}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-primary-500 hidden peer-checked:block"></span>
          </span>
          {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
      </div>
    );
  }
);

Radio.displayName = 'Radio';
