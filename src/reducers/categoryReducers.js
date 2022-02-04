import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  ADD_CATEGORIES_REQUEST,
  ADD_CATEGORIES_SUCCESS,
  ADD_CATEGORIES_FAIL,
  DELETE_CATEGORIES_REQUEST,
  DELETE_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_FAIL,
} from '../constants/categoryConstants';

export const categoriesReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { loading: true, products: [] };
    case GET_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORIES_REQUEST:
      return { loading: true };
    case ADD_CATEGORIES_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORIES_REQUEST:
      return { loading: true };
    case DELETE_CATEGORIES_SUCCESS:
      return {
        loading: false,
        ...action.payload,
      };
    case DELETE_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
