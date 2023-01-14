import { IProductItem } from '../components/catalog/CatalogTypes';

type SortValue = {
  title: string;
  sort: string;
  param?: string;
};

export interface IFilterState {
  catValue: {
    list: string[];
    active: number;
  };
  sortValue: {
    list: SortValue[];
    active: SortValue;
  };
}

export interface ISetAllFiltersData {
  catId: IFilterState['catValue']['active'];
  sort: IFilterState['sortValue']['active'];
}

export type PayloadSort = IFilterState['sortValue']['active'];

export interface IProductsState {
  items: IProductItem[];
  loading: boolean;
  count: number;
}

export interface ICartState {
  items: IProductItem[];
  loading: boolean;
  count: number;
  totalPrice: number;
}
