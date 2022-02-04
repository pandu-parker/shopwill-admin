import React from 'react';
import { useDispatch } from 'react-redux';

import { editOrder } from '../../../../actions/orderActions';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const setToTransit = () => {
    dispatch(editOrder({ orderId: order._id, orderStatus: 'in transit' }));
  };
  const setToDelivered = () => {
    dispatch(editOrder({ orderId: order._id, orderStatus: 'delivered' }));
  };
  return (
    <li className='order'>
      <p>
        Id : <span>{order._id}</span>{' '}
      </p>
      <p>
        Is Paid : <span>{order.isPaid ? 'paid' : 'not paid'}</span>{' '}
      </p>
      <p>
        Delivered :{' '}
        <span> {order.isDelivered ? 'delivered' : 'not delivered'}</span>
      </p>
      <p>
        Order value : <span> ₹ {order.totalPrice}</span>
      </p>
      <p>
        User : <span> {order.user.email}</span>
      </p>
      <p>
        Status : <span className='green-text'> {order.status}</span>
      </p>
      {order.status === 'in transit' || order.status === 'delivered' ? null : (
        <p>
          <button onClick={setToTransit} className='button'>
            Set to Intransit
          </button>
        </p>
      )}
      {order.isDelivered ? null : (
        <p>
          <button onClick={setToDelivered} className='button primary'>
            Set to delivered
          </button>
        </p>
      )}
    </li>
  );
};

export default Order;
