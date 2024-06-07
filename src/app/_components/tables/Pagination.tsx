import React, { useState, useEffect } from "react";

import DefaultButton from "./DefaultButton";

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 40, 50, 100];

interface PaginationProps {
  pages: number;
  page: number;
  previousText?: string;
  nextText?: string;
  pageSize?: number;
  totalRecords?: number;
  pageSizeOptions?: number[];
  showPageSizeOptions?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  PageButtonComponent?: React.ComponentType<any>;
}

const Pagination: React.FC<PaginationProps> = ({
  pages,
  page,
  previousText,
  nextText,
  pageSize,
  totalRecords,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showPageSizeOptions = true,
  onPageChange,
  onPageSizeChange,
  PageButtonComponent = DefaultButton,
}) => {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const activePage = page;

  useEffect(() => {
    setVisiblePages(getVisiblePages(page + 1, pages));
  }, [page, pages]);

  const filterPages = (visiblePages: number[], totalPages: number) => {
    return visiblePages.filter((page) => page <= totalPages);
  };

  const getVisiblePages = (page: number, total: number): number[] => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  const changePage = (page: number) => {
    if (page === activePage) {
      return;
    }

    const visiblePages = getVisiblePages(page, pages);

    setVisiblePages(filterPages(visiblePages, pages));

    onPageChange(page);
  };

  let startRecord = pageSize && pageSize * (page - 1) + 1;
  if (totalRecords === 0) {
    startRecord = 0;
  }

  let endRecord = pageSize && pageSize * page;
  if (endRecord && endRecord > totalRecords!) {
    endRecord = totalRecords!;
  }

  return (
    <div className="Table__container">
      <div className="Table__page">
        <span className="">
          {showPageSizeOptions && onPageSizeChange && pageSizeOptions && (
            <select
              className="select-page"
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              value={pageSize}
            >
              {pageSizeOptions.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          <span className="select-page-text">
            Showing {startRecord} - {endRecord} of {totalRecords}
          </span>
        </span>
      </div>
      <div className="Table__pagination">
        <div className="Table__prevPageWrapper">
          <PageButtonComponent
            className="switchPageButton"
            onClick={() => {
              if (activePage === 1) return;
              changePage(1);
            }}
            disabled={activePage === 1}
          >
            {previousText || (
              <i style={{ fontSize: 8 }} className="flaticon2-fast-back" />
            )}
          </PageButtonComponent>
          <PageButtonComponent
            className="switchPageButton"
            onClick={() => {
              if (activePage === 1) return;
              changePage(activePage - 1);
            }}
            disabled={activePage === 1}
          >
            {previousText || (
              <i style={{ fontSize: 8 }} className="flaticon2-back" />
            )}
          </PageButtonComponent>
        </div>
        <div className="Table__visiblePagesWrapper">
          {visiblePages.map((page, index, array) => {
            return (
              <PageButtonComponent
                key={page}
                className={
                  activePage === page
                    ? "Table__pageButton Table__pageButton--active"
                    : "Table__pageButton"
                }
                onClick={() => changePage(page)}
              >
                {array[index - 1] + 2 < page ? `${page}` : page}
              </PageButtonComponent>
            );
          })}
        </div>
        <div className="Table__nextPageWrapper">
          <PageButtonComponent
            className="switchPageButton"
            onClick={() => {
              if (activePage === pages) return;
              changePage(activePage + 1);
            }}
            disabled={activePage === pages}
          >
            {nextText || (
              <i style={{ fontSize: 8 }} className="flaticon2-next" />
            )}
          </PageButtonComponent>
          <PageButtonComponent
            className="switchPageButton"
            onClick={() => {
              if (activePage === pages) return;
              changePage(pages);
            }}
            disabled={activePage === pages}
          >
            {nextText || (
              <i style={{ fontSize: 8 }} className="flaticon2-fast-next" />
            )}
          </PageButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
