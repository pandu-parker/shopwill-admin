import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../components/Loader';
import '../styles/deals.scss';
import { editDeal, removeDeal } from '../actions/dealsActions';
import GoBack from '../components/GoBack'

const DealsScreen = () => {
  const dispatch = useDispatch();
  const dealsList = useSelector(state => state.dealsList);
  const { loading, deals } = dealsList;
  const hideHandler = id => {
    dispatch(editDeal(id, { show: false }));
  };
  const showHandler = id => {
    dispatch(editDeal(id, { show: true }));
  };
  const deleteHandler = id => {
    dispatch(removeDeal(id));
  };
  return (
    <div className='container'>
          <GoBack />
      <h2>Deals:</h2>
      {loading && <Loader />}
      <ul className='deals'>
        {deals &&
          deals.map(deal => {
            return (
              <li className='deal'>
                <p>Id :{deal._id}</p>
                <p>Product Name: {deal.product.name}</p>
                <p>Price : ₹{deal.product.price}</p>
                <p>Sale Price: ₹{deal.product.salePrice}</p>
                <p>
                  {deal.show ? (
                    <button
                      className='button'
                      onClick={e => hideHandler(deal._id)}
                    >
                      Hide from homepage
                    </button>
                  ) : (
                    <button
                      className='button'
                      onClick={e => showHandler(deal._id)}
                    >
                      Show on homepage{' '}
                    </button>
                  )}
                </p>
                <p>
                  <button
                    className='button'
                    onClick={e => deleteHandler(deal._id)}
                  >
                    Remove from deals
                  </button>
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default DealsScreen;
