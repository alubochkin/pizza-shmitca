import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFilterState, ISetAllFiltersData, PayloadSort } from '../reduxTypes';

const initialState: IFilterState = {
  catValue: {
    list: ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'],
    active: 0,
  },
  sortValue: {
    list: [
      { title: 'популярности', sort: 'rating' },
      { title: 'цене max', sort: 'price', param: 'desc' },
      { title: 'цене min', sort: 'price', param: 'asc' },
      { title: 'алфавиту', sort: 'title' },
    ],
    active: {
      title: 'популярности',
      sort: 'rating',
    },
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<number>) => {
      state.catValue.active = action.payload;
    },
    setSort: (state, action: PayloadAction<PayloadSort>) => {
      state.sortValue.active = action.payload;
    },
    setAllFilters: (state, action: PayloadAction<ISetAllFiltersData>) => {
      state.sortValue.active = action.payload.sort;
      state.catValue.active = action.payload.catId;
    },
  },
});

export const { setFilter, setSort, setAllFilters } = filterSlice.actions;
export const catValue = (state: RootState) => state.filter.catValue;
export default filterSlice.reducer;
