import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AdminProducts from '../components/AdminProducts';
import { getProducts } from '../actions/productActions';
import GoBack from '../components/GoBack';

const ProductScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return <div className='container'>
     <GoBack />
   <AdminProducts />
  </div>;
};

export default ProductScreen;
