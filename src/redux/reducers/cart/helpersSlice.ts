import { IProductItem } from '../../../components/catalog/CatalogTypes';

export function totalCalculate(items: IProductItem[]) {
  let count = 0;
  let total = 0;
  items.forEach((p: IProductItem) => {
    count += p?.quantity ?? 0;
    total += Number(p.price) * (p?.quantity ?? 1) ?? 0;
  });
  return { count, total };
}
