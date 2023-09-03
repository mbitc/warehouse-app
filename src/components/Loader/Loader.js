import React from 'react';
import { Rings } from 'react-loader-spinner';
import style from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={style.loaderWrapper}>
      <Rings
        height='80'
        width='80'
        color='#ffa938'
        radius='6'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='rings-loading'
      />
    </div>
  );
};

export default Loader;
