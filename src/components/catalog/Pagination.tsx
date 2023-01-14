import React from 'react';
import classNames from 'classnames';

const Pagination = ({ setPageValue, pages, activePage }: IPagination) => {
  return (
    <div className="pagination">
      {new Array(pages).fill('').map((_, i) => {
        return (
          <div
            className={classNames({
              pagination__item: true,
              active: i === activePage,
            })}
            onClick={() => setPageValue(i)}
            key={i}
          >
            {i + 1}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;

interface IPagination {
  setPageValue: (val: number) => void;
  pages: number;
  activePage: number;
}
