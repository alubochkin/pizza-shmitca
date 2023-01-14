import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Categories from '../components/catalog/Categories';
import SortProduct from '../components/catalog/SortProduct';
import ProductItem from '../components/catalog/ProductItem';
import { CONSTANT, IProductItem } from '../components/catalog/CatalogTypes';
import SkeletonProduct from '../components/catalog/SkeletonProduct';
import Pagination from '../components/catalog/Pagination';
import Title from '../components/common/Title';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getProduct } from '../redux/reducers/product/actionProducts';
import { getParams } from '../helpers/helpers';

export default function HomePage() {
  const navigate = useNavigate();
  const [openTopContent, setOpenTopContent] = useState<string | null>(null);
  const [page, setPage] = React.useState<number>(0);
  const sortValue = useAppSelector((state) => state.filter.sortValue.active);
  const catValue = useAppSelector((state) => state.filter.catValue.active);
  const cartElemsId = useAppSelector((state) => state.cart.items).map((el) => ({
    id: el.id,
    quantity: el.quantity,
  }));

  // const catList = useAppSelector((state) => state.filter.catValue.list);
  // const sortList = useAppSelector((state) => state.filter.sortValue.list);
  const paramsLocation = getParams(window.location.search);
  const {
    items: pizzes,
    loading,
    count,
  } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();
  const pages = Math.ceil(count / CONSTANT.STEP_PAGE);
  const calcElementsOnPage = (value: number) => {
    setPage(value);
  };

  const isPagination = pages > 1 && !!pizzes?.length;

  useEffect(() => {
    let params = '';
    if (catValue) {
      setPage(0);
      params = params.concat(`category=${catValue}&`);
    }
    params += `sortBy=${sortValue.sort}&order=${sortValue?.param ?? 'desc'}`;
    params += `&page=${page + 1}&limit=8`;

    dispatch(getProduct(params));

    navigate('?' + params);
    window.scrollTo(0, 0);
  }, [catValue, sortValue, page]);

  const paramPage = useMemo(
    () => Number(paramsLocation.page) - 1,
    [paramsLocation.page]
  );

  useEffect(() => {
    if (page !== paramPage && page) {
      setPage(paramPage);
      window.scrollTo(0, 0);
    }
  }, [paramPage]);

  const viewPizzesCarts = pizzes.map((pizza: IProductItem) => (
    <ProductItem key={pizza.id} {...pizza} cartElemsId={cartElemsId} />
  ));

  return (
    <div className="content">
      <div
        onClick={() => setOpenTopContent('open')}
        className="content__top__button-open"
      >
        open
      </div>
      <div
        className={classNames({
          content__top: true,
          open: openTopContent,
        })}
      >
        <div
          onClick={() => setOpenTopContent(null)}
          className="content__top__button-close"
        >
          X
        </div>
        <div className="content__top__wrapper">
          <SortProduct />
          <Categories />
        </div>
      </div>
      <Title size="middle" classname="content__title">
        Все пиццы
      </Title>
      <div className="content__items">
        {loading ? (
          <SkeletonProduct items={CONSTANT.STEP_PAGE} />
        ) : pizzes?.length ? (
          viewPizzesCarts
        ) : (
          <h1>нет товаров</h1>
        )}
      </div>
      {isPagination && (
        <Pagination
          activePage={page}
          pages={pages}
          setPageValue={calcElementsOnPage}
        />
      )}
    </div>
  );
}
