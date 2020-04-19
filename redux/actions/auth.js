import Cookies from 'js-cookie';
import api from '../../api';
import auth from '../actionTypes/auth';
import { DEFAULT_ERROR_MESSAGE } from '../../constants/api';

const attemptLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: auth.LOGIN });

    const res = await api('/auth/login', 'POST', { email, password });
    if (res && res.status >= 200 && res.status < 400) {
      console.log(res);
      const { token } = res.data;
      Cookies.set('token', token);
      dispatch({
        type: auth.LOGIN_SUCCESS,
        payload: token,
      });
    }
    if (res.status >= 400 && res.status < 600) throw new Error(res.message);
  } catch (e) {
    console.log(e);
    dispatch({ type: auth.LOGIN_ERROR, payload: e.message || DEFAULT_ERROR_MESSAGE });
  }
};

const attemptSignUp = (data) => async (dispatch) => {
  try {
    dispatch({ type: auth.SIGN_UP });

    const res = await api('/auth/register', 'POST', { ...data });
    if (res && res.status >= 200 && res.status < 400) {
      console.log(res);
      const { token } = res.data;
      Cookies.set('token', token);
      dispatch({
        type: auth.SIGN_UP_SUCCESS,
        payload: token,
      });
    }
    if (res.status >= 400 && res.status < 600) throw new Error(res.message);
  } catch (e) {
    console.log(e);
    dispatch({ type: auth.SIGN_UP_ERROR, payload: e.message || DEFAULT_ERROR_MESSAGE });
  }
};

const loadToken = () => async (dispatch) => {
  const savedToken = Cookies.get('token');
  dispatch({ type: auth.LOAD_SAVED_TOKEN, payload: savedToken });
};

const logOut = () => async (dispatch) => {
  dispatch({ type: auth.LOGOUT });
  localStorage.clear();
  Cookies.remove('token');
};
export default { attemptLogin, attemptSignUp, loadToken, logOut };
