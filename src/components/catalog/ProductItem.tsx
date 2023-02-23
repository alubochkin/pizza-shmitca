import React, { useEffect, useState } from 'react';
import { IProductItem } from './CatalogTypes';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addCart } from '../../redux/reducers/cart/actionCart';

export default function ProductItem(props: IProductItem) {
  const { imageUrl, title, types, sizes, price, id, cartElemsId } = props;
  const [optionVal, setOptionVal] = useState<number>(types[0]);
  const [sizeVal, setSizeVal] = useState<string>(sizes[0]);
  const [count, setCount] = useState<number>(0);

  const options = ['традиционное', 'тонкое'];
  const dispatch = useAppDispatch();
  const pizzes = useAppSelector((state) => state.products.items);

  useEffect(() => {
    cartElemsId?.forEach((el) => {
      if (Number(el.id) === Number(id)) {
        setCount(Number(el.quantity ?? 0));
      }
    });
  }, [cartElemsId]);

  const addCartHandler = () => {
    setCount(count + 1);
    const pizza = pizzes.find((el) => el.id === id) as IProductItem;
    dispatch(
      addCart({
        quantity: 1,
        ...pizza,
      })
    );
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">
        <Link to={'product/id:' + id}>{title}</Link>
      </h4>
      <div className="pizza-block__selector">
        <ul>
          {options.map((option, i) => (
            <li
              onClick={() => setOptionVal(i)}
              className={options[optionVal] === option ? 'active' : ''}
              key={i}
            >
              {option}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              onClick={() => setSizeVal(size)}
              className={sizeVal === size ? 'active' : ''}
              key={i}
            >
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price}</div>
        <div
          onClick={addCartHandler}
          className="button button--outline button--add"
        >
          <span className="button__icon icon-add"></span>
          <i>{count}</i>
        </div>
      </div>
    </div>
  );
}
