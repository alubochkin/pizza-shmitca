import React, { useCallback, useEffect, useState } from 'react';
import dh from '../../helpers/domHelper';
import { setSort } from '../../redux/reducers/filterReducer';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { PayloadSort } from '../../redux/reduxTypes';

export default function SortProduct() {
  const { active: sortValue, list: listSort } = useAppSelector(
    (state) => state.filter.sortValue
  );
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const close = useCallback((e: MouseEvent | null): void => {
    const param = e?.target as HTMLElement;
    if (!(param?.parentElement?.dataset.popup === 'sort')) {
      setOpen(false);
      dh.reListener('click', close);
    }
  }, []);

  useEffect(() => {
    if (open) {
      dh.addListener('click', close);
    }

    return () => dh.reListener('click', close);
  }, [close, open]);

  const selectTypeSort = (data: PayloadSort): void => {
    dispatch(setSort(data));
    close(null);
  };

  return (
    <div className="sort">
      <div data-popup="sort" className="sort__label">
        <b>Сортировка по:</b>
        <span className="sort-toggle" onClick={() => setOpen((prev) => !prev)}>
          {sortValue.title}
        </span>
      </div>
      <div
        className={classNames({
          sort__popup: true,
          open: open,
        })}
      >
        <ul data-popup="sort">
          {listSort.map((elSort, i) => (
            <li
              className={sortValue.title === elSort.title ? 'active' : ''}
              onClick={() => selectTypeSort(listSort[i])}
              key={i}
            >
              {elSort.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
