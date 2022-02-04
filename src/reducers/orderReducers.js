import {
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    EDIT_ORDER_FAIL,
    EDIT_ORDER_REQUEST,
    EDIT_ORDER_SUCCESS
} from '../constants/orderConstants';
  
  export const ordersRedcuer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case GET_ORDERS_REQUEST:
        return { loading: true, orders: [] };
      case GET_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
        };
      case GET_ORDERS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const editOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case EDIT_ORDER_REQUEST:
        return { loading: true};
      case EDIT_ORDER_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
      case EDIT_ORDER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };