import Cookies from 'js-cookie';
import user from '../actionTypes/user';
import Storage from '../../util/storage';
import api from '../../api';
import { DEFAULT_ERROR_MESSAGE } from '../../constants/api';

const loadUser = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (state.user.data) {
      console.log('User Already Present in Store', state.user.data);
      return;
    }

    dispatch({ type: user.LOAD_USER });

    const res = await api('/users', 'GET');
    console.log(res);
    if (res && res.status >= 200 && res.status < 400) {  
      const { data } = res;
      dispatch({
        type: user.LOAD_USER_SUCCESS,
        payload: data,
      });
    }
    if (res.status >= 400 && res.status < 600) throw new Error(res.message);
  } catch (e) {
    console.log(e);
    dispatch({ type: user.LOAD_USER_ERROR, payload: e.message || DEFAULT_ERROR_MESSAGE });
  }
};
export default {
  loadUser,
};
