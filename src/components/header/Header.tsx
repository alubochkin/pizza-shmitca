import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

export default function Header() {
  const { count, totalPrice } = useAppSelector((store) => store.cart);
  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <span className="header__logo-img"></span>
          <div>
            <h1>Pizza-Shmitca</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </Link>
        <div className="header__action-block">
          <div className="header-user">
            <div className="header-user-icon"></div>
            <div className="header-total-count">Alex</div>
            <div className="header-modal">
              <div className="header__cart-modal__total-price">960 р.</div>
              <Link to="/cart" className="header__link">
                Перейти в корзину
              </Link>
            </div>
          </div>
          <Link to="/cart" className="header-info">
            <div className="header__cart-total-count">{count}</div>
            <span className="header__delimiter"></span>
            <div className="header__cart-total-price">{totalPrice} р.</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
