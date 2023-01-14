import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FetchProductData,
  IProductItem,
} from '../../../components/catalog/CatalogTypes';
import { ls } from '../../../helpers/helpers';

export const getCart = createAsyncThunk<any, string>(
  'cart/getCart',
  async (id, thunkAPI) => {
    try {
      const response = ls.getVal('cart') ?? null;
      return response as FetchProductData;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить данные');
    }
  }
);

export const addCart = createAsyncThunk<any, IProductItem>(
  'cart/addCart',
  async (item, thunkAPI) => {
    try {
      let response = {} as FetchProductData;
      if (ls.has('cart')) {
        const cart = ls.getVal('cart') as FetchProductData;
        if (cart.items.some((c) => c.id === item.id)) {
          cart.items.map((c) =>
            c.quantity && c.id === item.id ? c.quantity++ : null
          );

          response = cart;
        } else {
          cart.items.push(item);
          response = cart;
        }

        cart.count += 1;
        ls.setVal('cart', cart);
      } else {
        response = { items: [item], count: 1 };
        ls.setVal('cart', { ...response });
      }

      return response as FetchProductData;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить данные');
    }
  }
);

export const quantityItemCart = createAsyncThunk<
  any,
  { type: 'inc' | 'dec'; id: number }
>('cart/addCart', async ({ type, id }, thunkAPI) => {
  try {
    const cart = ls.getVal('cart') as FetchProductData;
    cart.items = cart.items
      .map((item) => {
        if (item.id === id && item.quantity) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          if (type === 'inc') item.quantity += 1;
          else item.quantity -= 1;
        }
        return item;
      })
      .filter((item) => item.quantity && item.quantity > 0);
    if (type === 'dec') cart.count -= 1;
    if (type === 'inc') cart.count += 1;

    ls.setVal('cart', cart);
    return cart;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось получить данные');
  }
});

// function quantityControl (type: 'inc'| 'dec', id: number) {
//   if (type === 'dec') {
//
//   }
// }
