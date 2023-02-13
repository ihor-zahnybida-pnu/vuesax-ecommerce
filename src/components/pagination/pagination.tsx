import React from 'react';
import styled from 'styled-components';
import PaginationItem from './pagination-item.component';
import { DOTS, usePagination } from './usePagination';
import { ChevronLeft, ChevronRight } from '../icons';

export interface PaginationProps {
  currentPage: number;
  totalCount: number;
  siblingCount?: number;
  boundaryCount?: number;
  onPageChange: (page: number) => void;
}

const PaginationStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em;
`;

export const Pagination: React.FC<PaginationProps> = (
  props: PaginationProps
) => {
  const {
    currentPage,
    onPageChange,
    totalCount,
    siblingCount = 1,
  } = props;
  const paginationTheme = {};

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
  });

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  const ArrowLeft = (
    <PaginationItem
      disabled={currentPage === 1}
      onClick={() => currentPage > 1 && handleClick(currentPage - 1)}
      value={<ChevronLeft width='20px' height='20px' />}
    />
  );
  const ArrowRight = (
    <PaginationItem
    onClick={() => currentPage < totalCount && handleClick(currentPage + 1)}
    value={<ChevronRight width='20px' height='20px' />}
    disabled={currentPage === totalCount}
    />
  );

  return (
    <PaginationStyled className="pagination" theme={paginationTheme}>
      {ArrowLeft}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <span
              key={index}
              style={{
                margin: '0 14px',
              }}
            >
              ...
            </span>
          );
        }

        return (
          <PaginationItem
            key={index}
            onClick={() => handleClick(pageNumber as number)}
            value={pageNumber}
            selected={currentPage === pageNumber}
          />
        );
      })}
      {ArrowRight}
    </PaginationStyled>
  );
};

export default Pagination;
