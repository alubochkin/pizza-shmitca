import http from '../../../http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchProductData } from '../../../components/catalog/CatalogTypes';

export const getProduct = createAsyncThunk<any, string>(
  'product/getProducts',
  async (params, thunkAPI) => {
    try {
      // const products = store.getState().products;
      const response = await http.get('/products' + '?' + params);
      return response.data as FetchProductData;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
    }
  }
);
