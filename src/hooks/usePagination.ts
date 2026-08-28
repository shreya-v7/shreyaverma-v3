import { useMemo, useState } from 'react';

export function usePagination<T>(items: T[], perPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const page = Math.min(currentPage, totalPages);
  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  return { currentPage: page, setCurrentPage, totalPages, pageItems };
}
