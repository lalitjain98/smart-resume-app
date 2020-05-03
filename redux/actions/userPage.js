import Cookies from 'js-cookie';
import moment from 'moment';
import userPage from '../actionTypes/userPage';
import Storage from '../../util/storage';
import api from '../../api';
import { DEFAULT_ERROR_MESSAGE } from '../../constants/api';

const loadUserByUsername = (username) => async (dispatch, getState) => {
  try {
    dispatch({ type: userPage.LOAD_USER_BY_USERNAME });

    const res = await api('/users', 'GET', null, { username });
    console.log(res);
    if (res && res.status >= 200 && res.status < 400) {
      const { data } = res;
      dispatch({
        type: userPage.LOAD_USER_BY_USERNAME_SUCCESS,
        payload: {
          ...data,
          lastSynced: new Date().toISOString(),
        },
      });
    }
    if (res.status >= 400 && res.status < 600) throw new Error(res.message);
  } catch (e) {
    console.log(e);
    dispatch({ type: userPage.LOAD_USER_BY_USERNAME_ERROR, payload: e.message || DEFAULT_ERROR_MESSAGE });
  }
};

const setUserLinkUrl = (link) => dispatch => {
  dispatch({
    type: userPage.SET_USER_LINK,
    payload: link,
  })
}

export default {
  loadUserByUsername,
  setUserLinkUrl,
};
