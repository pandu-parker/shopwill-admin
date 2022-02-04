import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../actions/orderActions';

import Order from './components/Order';
import Loader from '../Loader';

import './styles.scss';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const ordersReducer = useSelector(state => state.orders);
  const { orders, loading } = ordersReducer;
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <div>
      {loading && <Loader />}
      <ul className='order-list'>
        {orders &&
          orders.map(order => {
            return <Order order={order} />;
          })}
      </ul>
    </div>
  );
};

export default AdminOrders;
