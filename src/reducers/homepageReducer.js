import {
  GET_BANNERS_FAIL,
  GET_BANNERS_REQUEST,
  GET_BANNERS_SUCCESS,
  EDIT_BANNERS_FAIL,
  EDIT_BANNERS_REQUEST,
  EDIT_BANNERS_SUCCESS,
} from '../constants/homepageConstants';

export const bannersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BANNERS_REQUEST:
      return { loading: true };
    case GET_BANNERS_SUCCESS:
      return {
        loading: false,
        banners: action.payload,
      };
    case GET_BANNERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bannersEditReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_BANNERS_REQUEST:
      return { loading: true };
    case EDIT_BANNERS_SUCCESS:
      return {
        loading: false,
        ...action.payload,
      };
    case EDIT_BANNERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
