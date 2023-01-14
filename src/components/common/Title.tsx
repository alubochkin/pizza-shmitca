import React from 'react';
import classNames from 'classnames';

interface ITitle {
  children: string;
  size: 'small' | 'middle' | 'large';
  classname: string;
}

const Title = ({ children, size, classname }: ITitle) => {
  return (
    <h2
      className={classNames({
        [classname]: true,
        [size]: true,
      })}
    >
      {children}
    </h2>
  );
};

export default Title;
