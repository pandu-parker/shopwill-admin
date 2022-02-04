import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  ADD_PRODUCT_CLEAR
} from '../constants/productConstants';

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true };
    case ADD_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };
    case ADD_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case ADD_PRODUCT_CLEAR:
      return {};
    default:
      return state;
  }
};

export const ProductListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
          return { loading: true, products: [] };
        case GET_PRODUCTS_SUCCESS:
          return {
            loading: false,
            ...action.payload
          };
        case GET_PRODUCTS_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
}

export const productDetailsReducer = (state = {product: {}}, action) => {
  switch (action.type) {
      case PRODUCT_DETAIL_REQUEST:
        return { loading: true, product: {} };
      case PRODUCT_DETAIL_SUCCESS:
        return {
          loading: false,
          product: action.payload
        };
      case PRODUCT_DETAIL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
}

export const editProductReducer = (state = {}, action) => {
  switch (action.type) {
      case EDIT_PRODUCT_REQUEST:
        return { loading: true };
      case EDIT_PRODUCT_SUCCESS:
        return {
          loading: false,
          product: action.payload,
          success: true
        };
      case EDIT_PRODUCT_FAIL:
        return { loading: false, error: action.payload };
      case EDIT_PRODUCT_RESET : 
        return {}
      default:
        return state;
    }
}

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
        return { loading: true };
      case DELETE_PRODUCT_SUCCESS:
        return {
          loading: false,
          ...action.payload,
        };
      case DELETE_PRODUCT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
}
