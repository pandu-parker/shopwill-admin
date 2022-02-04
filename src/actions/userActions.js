import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
  } from '../constants/userConstants';
  
  import axios from 'axios';
  
  export const signUp = user => async dispatch => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      console.log('here', user);
      const { data } = await axios.post('/api/users', user, config);
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const login =
    (email, password, userType) => async (dispatch, getState) => {
      try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        console.log(userType)
        const { data } = await axios.post(
          `/api/${userType}/login`,
          { email, password },
          config
        );
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error) {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  
  export const logout = () => dispatch => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem('userInfo');
  };
  