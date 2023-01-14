import { createSlice } from '@reduxjs/toolkit';
import { ICartState } from '../../reduxTypes';
import { addCart, getCart } from './actionCart';
import { IProductItem } from '../../../components/catalog/CatalogTypes';

const initialState: ICartState = {
  items: [],
  loading: false,
  count: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;

        const { count, total } = totalCalculate(action.payload.items);

        state.count = count;
        state.totalPrice = total;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      });
    builder.addCase(addCart.fulfilled, (state, action) => {
      state.loading = false;
      const { count, total } = totalCalculate(action.payload.items);
      state.items = action.payload.items;
      state.count = count;
      state.totalPrice = total;
    });
  },
});

function totalCalculate(items: IProductItem[]) {
  let count = 0;
  let total = 0;
  items.forEach((p: IProductItem) => {
    count += p?.quantity ?? 0;
    total += Number(p.price) * (p?.quantity ?? 1) ?? 0;
  });
  return { count, total };
}

export default cartSlice.reducer;
