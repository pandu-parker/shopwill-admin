import {
    GET_BANNERS_REQUEST,
    GET_BANNERS_SUCCESS,
    GET_BANNERS_FAIL,
    EDIT_BANNERS_FAIL,
    EDIT_BANNERS_REQUEST,
    EDIT_BANNERS_SUCCESS
} from '../constants/homepageConstants';
  
  import axios from 'axios';
  
  export const getBanners = () => async (dispatch) => {
    try {
      dispatch({ type: GET_BANNERS_REQUEST });
      const { data } = await axios.get('/api/homepage/banner');
      dispatch({
        type: GET_BANNERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BANNERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const editBanner = (banner) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_BANNERS_REQUEST });
      const config = {
        headers : {
          'Content-type' : 'application/json'
        }
      }
      const {data} = await axios.put('/api/homepage/banner', banner , config);
      dispatch({
        type: EDIT_BANNERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_BANNERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  