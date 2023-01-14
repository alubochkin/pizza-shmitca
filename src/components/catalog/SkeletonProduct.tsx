import React from 'react';

const SkeletonProduct = ({ items }: { items: number }): JSX.Element => {
  const arr = Array(items).fill('');
  const skeleton = arr.map((el, i) => (
    <div key={i} className="pizza-block skeleton">
      <div className="pizza-block__image" />
      <div className="pizza-block__title"></div>
      <div className="pizza-block__selector" />
      <div className="pizza-block__bottom" />
    </div>
  ));

  return <>{skeleton}</>;
};

export default SkeletonProduct;
