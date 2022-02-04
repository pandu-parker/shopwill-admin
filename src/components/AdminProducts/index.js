import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';

import {
  getProducts,
  addProduct,
  deleteProduct,
} from '../../actions/productActions';
import { ADD_PRODUCT_CLEAR } from '../../constants/productConstants';
import Message from '../Message';
import Loader from '../Loader';

import './style.scss';
import { addDeal, removeDeal } from '../../actions/dealsActions';
import axios from 'axios';

const AdminProducts = ({ history }) => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { error, products, loading } = productList;

  const delteProductReducer = useSelector(state => state.deleteProduct);
  const { success: deleteSuccess } = delteProductReducer;
  const addProductReducer = useSelector(state => state.addProduct);
  const { product, success: addSuccess } = addProductReducer;

  const [downloading, setDownloading] = useState(false);
  const [path, setPath] = useState(false);

  // DEALS
  const dealsList = useSelector(state => state.dealsList);
  const { deals } = dealsList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, deleteSuccess]);
  const addProductHandler = () => {
    dispatch(addProduct());
  };

  const deleteHandler = id => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (addSuccess) {
      if (product) {
        dispatch({ type: ADD_PRODUCT_CLEAR });
        history.push(`/admin/products/edit/${product._id}`);
      }
    }
  }, [addSuccess, history, product, dispatch]);

  const addDealHandler = id => {
    dispatch(addDeal(id));
  };

  const removeDealHandler = id => {
    let deal = deals.find(deal => {
      return deal.product._id === id;
    });
    dispatch(removeDeal(deal._id));
  };
  const isInDeals = id => {
    if (!deals) return;
    const isPresent = deals.some(deal => {
      return deal.product._id === id;
    });
    return isPresent;
  };

  const downloadProducts = async () => {
    const res = await axios.post('/api/products/download');
    if (res.data) {
      setDownloading(true);
      setPath(res.data.substring(1));
      console.log(res.data);
    }
  };
  useEffect(() => {
    console.log(path)
    // if (path) {
      // var element = document.createElement('a');
      // element.setAttribute('href', '/public/data.csv');
      // element.innerHTML = 'download';
      // element.setAttribute('download', 'data.csv');
      // document.body.appendChild(element);
      // element.click();
      // setDownloading(false);
      // setPath(false);
    // }
  }, [path]);

  return (
    <div>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <button onClick={addProductHandler} className='button add'>
        Add Product <IoMdAdd />{' '}
      </button>
      {!path ? (
        <button onClick={downloadProducts}>Generate CSV</button>
      ) : (
        <a href='http://localhost:5000/public/data.csv' download>
          {' '}Click to Download{' '}
        </a>
      )}
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Count In Stock</th>
            <th>Price</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map(product => {
              return (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.price}</td>
                  <td>{product.salePrice}</td>
                  <td>
                    {' '}
                    <Link to={`/admin/products/edit/${product._id}`}>
                      Edit
                    </Link>{' '}
                  </td>
                  <td>
                    {' '}
                    <button
                      onClick={e => deleteHandler(product._id)}
                      className='button delete'
                    >
                      Delete
                    </button>{' '}
                  </td>
                  <td>
                    {isInDeals(product._id) ? (
                      <button
                        className='button primary'
                        onClick={e => removeDealHandler(product._id)}
                      >
                        Remove Deal
                      </button>
                    ) : (
                      <button
                        className='button primary'
                        onClick={e => addDealHandler(product._id)}
                      >
                        Add to Deals
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(AdminProducts);
