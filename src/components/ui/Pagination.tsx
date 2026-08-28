interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-md bg-neutral-100 px-4 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-neutral-700 dark:text-neutral-300">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-md bg-neutral-100 px-4 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
      >
        Next
      </button>
    </div>
  );
};
