import React, { useCallback, useEffect, useRef, useState } from 'react';
import { setFilter } from '../../redux/reducers/filterReducer';
import dh from '../../helpers/domHelper';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export default function Categories() {
  const { active: catValue, list } = useAppSelector(
    (state) => state.filter.catValue
  );
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const closeCat = useCallback((e: MouseEvent | null): void => {
    const elem = e?.target as HTMLElement;
    if (!popupRef.current?.contains(elem)) {
      setOpen(false);
      dh.reListener('click', closeCat);
    }
  }, []);

  useEffect(() => {
    if (open) {
      dh.addListener('click', closeCat);
    }
    return () => dh.reListener('click', closeCat);
  }, [close, open]);

  const clickChangeHandler = (i: number) => {
    dispatch(setFilter(i));
    setOpen(false);
  };

  return (
    <div ref={popupRef} className="categories">
      <div onClick={() => setOpen((p) => !p)} className="label-mobile">
        <span>По категории</span>
        <span>{list[catValue]}</span>
      </div>
      <ul className={open ? 'open' : ''}>
        {list.map((cat, i) => (
          <li
            onClick={() => clickChangeHandler(i)}
            className={catValue === i ? 'active' : ''}
            key={i}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
