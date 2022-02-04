import {
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORIES_FAIL,
  ADD_CATEGORIES_REQUEST,
  ADD_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_REQUEST,
  DELETE_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_FAIL,
} from '../constants/categoryConstants';

import axios from 'axios';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    const { data } = await axios.get('/api/categories/category');
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const AddCategory = (name, type, parentCategory) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CATEGORIES_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `/api/categories/${type}`,
      {
        name,
        parentCategory,
      },
      config
    );
    dispatch({ type: ADD_CATEGORIES_SUCCESS , payload : {...data} });
  } catch (error) {
    dispatch({
      type: ADD_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id, type) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORIES_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.delete(
      `/api/categories/${type}/${id}`,
      config
    );
    dispatch({ type: DELETE_CATEGORIES_SUCCESS, payload: { ...data } });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
