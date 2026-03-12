import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  showValue?: boolean;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, showValue = true, value, min = 0, max = 100, ...props }, ref) => {
    return (
      <div className={cn('w-full', className)}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <span className="text-xs font-semibold uppercase text-gray-600">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-xs font-semibold text-primary-500">
                {value}
              </span>
            )}
          </div>
        )}
        <input
          type="range"
          ref={ref}
          value={value}
          min={min}
          max={max}
          className={cn(
            'w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer',
            'accent-primary-500',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:w-4',
            '[&::-webkit-slider-thumb]:h-4',
            '[&::-webkit-slider-thumb]:bg-primary-500',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-webkit-slider-thumb]:shadow-md'
          )}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
