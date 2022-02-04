import {
  EDIT_HSN_FAIL,
  EDIT_HSN_SUCCESS,
  EDIT_HSN_REQUEST,
  GET_HSN_SUCCESS,
  GET_HSN_REQUEST,
  GET_HSN_FAIL,
} from '../constants/hsnConstants';

export const hsnListReducer = (state = {hsn : []}, action) => {
  switch (action.type) {
    case GET_HSN_REQUEST:
      return { loading: true };
    case GET_HSN_SUCCESS:
      return {
        loading: false,
        hsn: action.payload,
        success: true,
      };
    case GET_HSN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
