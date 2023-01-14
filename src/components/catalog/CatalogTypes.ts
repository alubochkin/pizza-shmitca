export interface IProductItem {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: string[];
  price: string | number;
  quantity?: number;
  cartElemsId?: { id: number; quantity: number | undefined }[];
}

export type FetchProductData = {
  items: IProductItem[];
  count: number;
};

export interface IResponseProduct {
  data: FetchProductData;
}

export interface ICatProps {
  value: number;
  changeCategory: (id: number) => void;
}

export type ObjSort = {
  title: string | 'популярности' | 'цене' | 'алфавиту';
  sort: string | 'rating' | 'price' | 'title';
  param?: string | 'asc' | 'desc';
};

export interface ISortProps {
  value: ObjSort;
  changeSort: (obj: ObjSort) => void;
}

export enum CONSTANT {
  STEP_PAGE = 8,
}
