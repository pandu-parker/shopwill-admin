import {
  GET_DEALS_REQUEST,
  GET_DEALS_FAIL,
  GET_DEALS_SUCCESS,
  ADD_DEAL_REQUEST,
  ADD_DEAL_FAIL,
  ADD_DEAL_SUCCESS,
  REMOVE_DEAL_REQUEST,
  REMOVE_DEAL_FAIL,
  REMOVE_DEAL_SUCCESS,
} from '../constants/dealsConstants';

export const dealsListReducer = (state = { deals: [] }, action) => {
  switch (action.type) {
    case GET_DEALS_REQUEST:
      return { loading: true, deals: [] };
    case GET_DEALS_SUCCESS:
      return {
        loading: false,
        deals: action.payload,
      };
    case GET_DEALS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addDealReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DEAL_REQUEST:
      return { loading: true };
    case ADD_DEAL_SUCCESS:
      return {
        loading: false,
        ...action.payload,
      };
    case ADD_DEAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeDealReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_DEAL_REQUEST:
      return { loading: true };
    case REMOVE_DEAL_SUCCESS:
      return {
        loading: false,
        ...action.payload,
      };
    case REMOVE_DEAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
