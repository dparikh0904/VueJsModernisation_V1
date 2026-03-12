import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  size = 'md',
  className,
}: PaginationProps) {
  const pagesToDisplay = 5;
  
  const getPageNumbers = () => {
    const pages: number[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(pagesToDisplay / 2));
    let endPage = Math.min(totalPages, startPage + pagesToDisplay - 1);
    
    if (endPage - startPage + 1 < pagesToDisplay) {
      startPage = Math.max(1, endPage - pagesToDisplay + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors',
          sizeClasses[size],
          currentPage === 1 && 'opacity-50 cursor-not-allowed'
        )}
        aria-label="Previous page"
      >
        <i className="fa fa-angle-left"></i>
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'flex items-center justify-center rounded-full font-medium transition-colors',
            sizeClasses[size],
            currentPage === page
              ? 'bg-primary-500 text-white border border-primary-500'
              : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
          )}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors',
          sizeClasses[size],
          currentPage === totalPages && 'opacity-50 cursor-not-allowed'
        )}
        aria-label="Next page"
      >
        <i className="fa fa-angle-right"></i>
      </button>
    </nav>
  );
}
