import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filter from './reducers/filterReducer';
import products from './reducers/product/productReducer';
import cart from './reducers/cart/cartReducer';

const rootReducer = combineReducers({
  filter,
  products,
  cart,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
