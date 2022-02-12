import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  EDIT_ORDER_REQUEST,
  EDIT_ORDER_SUCCESS,
  EDIT_ORDER_FAIL,
} from '../constants/orderConstants';

import axios from 'axios';

export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders/all`, config);
    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editOrder =
  (orderId, orderStatus) => async (dispatch, getState) => {
    try {
      dispatch({ type: EDIT_ORDER_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/orders/status`,
        { ...orderId, ...orderStatus },
        config
      );
      dispatch({
        type: EDIT_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
