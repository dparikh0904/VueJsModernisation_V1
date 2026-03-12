import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  className?: string;
}

const variantClasses = {
  primary: 'bg-primary-500',
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning',
  info: 'bg-info',
};

export function Progress({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'primary',
  className,
}: ProgressProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-xs font-semibold uppercase text-primary-500">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-xs font-semibold text-gray-600">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        ></div>
      </div>
    </div>
  );
}
