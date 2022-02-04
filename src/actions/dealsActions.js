import {
  GET_DEALS_REQUEST,
  GET_DEALS_FAIL,
  GET_DEALS_SUCCESS,
  REMOVE_DEAL_REQUEST,
  REMOVE_DEAL_SUCCESS,
  REMOVE_DEAL_FAIL,
  ADD_DEAL_REQUEST,
  ADD_DEAL_SUCCESS,
  ADD_DEAL_FAIL,
  EDIT_DEAL_REQUEST,
  EDIT_DEAL_SUCCESS,
  EDIT_DEAL_FAIL,
} from '../constants/dealsConstants';

import axios from 'axios';

export const getDeals = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DEALS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get('/api/deals/all', config);
    dispatch({
      type: GET_DEALS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEALS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addDeal =
  (product, show = false) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_DEAL_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        '/api/deals/',
        { product, show },
        config
      );
      dispatch({
        type: ADD_DEAL_REQUEST,
        payload: data,
      });
      dispatch(getDeals())
    } catch (error) {
      dispatch({
        type: ADD_DEAL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const removeDeal = id => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_DEAL_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/deals/${id}`, config);
    dispatch({
      type: REMOVE_DEAL_SUCCESS,
      payload: data,
    });
    dispatch(getDeals())
  } catch (error) {
    dispatch({
      type: REMOVE_DEAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editDeal = (id, show) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_DEAL_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/deals/${id}`, { ...show }, config);
    dispatch({
      type: EDIT_DEAL_SUCCESS,
      payload: data,
    });
    dispatch(getDeals())
  } catch (error) {
    dispatch({
      type: EDIT_DEAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
