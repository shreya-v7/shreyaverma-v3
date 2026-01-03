interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  color?: 'amber' | 'cyan' | 'indigo';
}

export const Pagination = ({ currentPage, totalPages, onPageChange, color = 'amber' }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const colorClasses = {
    amber: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800',
    cyan: 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-800',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800',
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${colorClasses[color]}`}
      >
        Previous
      </button>
      <span className="px-4 py-2 text-neutral-700 dark:text-neutral-300">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${colorClasses[color]}`}
      >
        Next
      </button>
    </div>
  );
};

