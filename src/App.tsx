import React, { useEffect } from 'react';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/CartPage';
import NotFound from './pages/NotFound';
import ProductPage from './pages/ProductPage';
import ErrorBoundary from './ErrorsBoundary';
import { useAppDispatch } from './hooks/redux';
import { getCart } from './redux/reducers/cart/actionCart';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCart('cart'));
  });
  return (
    <ErrorBoundary>
      <div className="wrapper">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
