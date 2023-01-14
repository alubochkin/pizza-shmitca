import { createSlice } from '@reduxjs/toolkit';
// import { productApi } from '../../services/productApi';
import { IProductsState } from '../../reduxTypes';
import { getProduct } from './actionProducts';

const initialState: IProductsState = {
  items: [],
  loading: false,
  count: 0,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.count = action.payload.count;
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      });
  },
});
export default productsSlice.reducer;
