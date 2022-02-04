import {
  EDIT_HSN_FAIL,
  EDIT_HSN_REQUEST,
  EDIT_HSN_SUCCESS,
  GET_HSN_FAIL,
  GET_HSN_REQUEST,
  GET_HSN_SUCCESS,
  ADD_HSN_REQUEST,
  ADD_HSN_SUCCESS,
  ADD_HSN_FAIL,
  DELETE_HSN_REQUEST,
  DELETE_HSN_SUCCESS,
  DELETE_HSN_FAIL,
} from '../constants/hsnConstants';

import axios from 'axios';

export const getAllHSN = () => async dispatch => {
  try {
    dispatch({ type: GET_HSN_REQUEST });
    const { data } = await axios.get('/api/hsn');
    dispatch({
      type: GET_HSN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_HSN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchHsn = query => async dispatch => {
  try {
    dispatch({ type: GET_HSN_REQUEST });
    const { data } = await axios.get(`/api/hsn/search?query=${query}`);
    dispatch({
      type: GET_HSN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_HSN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addHSN =
  ({ category, subCategory, value, sgst, cgst, igst }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_HSN_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/hsn`,
        {
          category,
          subCategory,
          value,
          sgst,
          cgst,
          igst
        },
        config
      );
      dispatch({ type: ADD_HSN_SUCCESS, payload: { ...data } });
      dispatch(getAllHSN());
    } catch (error) {
      dispatch({
        type: ADD_HSN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editHSN =
  ({ id, category, subCategory, value, sgst, cgst, igst }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EDIT_HSN_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/hsn/${id}`,
        {
          category,
          subCategory,
          value,
          sgst,
          cgst,
          igst
        },
        config
      );
      dispatch({ type: EDIT_HSN_SUCCESS, payload: { ...data } });
      dispatch(getAllHSN());
    } catch (error) {
      dispatch({
        type: EDIT_HSN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteHSN = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_HSN_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/hsn/${id}`, config);
    dispatch({ type: DELETE_HSN_SUCCESS, payload: { ...data } });
    dispatch(getAllHSN());
  } catch (error) {
    dispatch({
      type: DELETE_HSN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
