import { useMemo } from 'react';

interface PaginationArgs {
  totalCount: number;
  siblingCount: number;
  currentPage: number;
}

export const DOTS = '...';

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  siblingCount = 1,
  currentPage,
}: PaginationArgs) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalCount) {
      return range(1, totalCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalCount - rightItemCount + 1, totalCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalCount, siblingCount, currentPage]);

  return paginationRange;
};
