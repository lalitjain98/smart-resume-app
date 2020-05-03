import Cookies from 'js-cookie';
import moment from 'moment';
import user from '../actionTypes/user';
import Storage from '../../util/storage';
import api from '../../api';
import { DEFAULT_ERROR_MESSAGE } from '../../constants/api';

const loadUser = (force = false) => async (dispatch, getState) => {
  try {
    const state = getState();

    if (!force && state.user.data) {
      const { data } = state.user || {};

      const lastSyncDate = Date.parse(data.lastSyncDate);
      const currDate = new Date();
      console.log('lastSync Date difference', currDate - lastSyncDate);
      if (currDate - lastSyncDate < 5 * 60 * 1000) {
        console.log('User Already Present in Store and is recently updated', state.user.data);
        return;
      }
    }

    dispatch({ type: user.LOAD_USER });

    const res = await api('/users/me', 'GET');
    console.log(res);
    if (res && res.status >= 200 && res.status < 400) {
      const { data } = res;
      dispatch({
        type: user.LOAD_USER_SUCCESS,
        payload: {
          ...data,
          lastSynced: new Date().toISOString(),
        },
      });
    }
    if (res.status >= 400 && res.status < 600) throw new Error(res.message);
  } catch (e) {
    console.log(e);
    dispatch({ type: user.LOAD_USER_ERROR, payload: e.message || DEFAULT_ERROR_MESSAGE });
  }
};

const updateUser = (obj) => async (dispatch, getState) => {
  try {
    const state = getState();

    dispatch({ type: user.UPDATE_USER });

    const formData = new FormData();
    const updates = {};
    Object.entries(obj).forEach(([key, val]) => {
      if (val) {
        formData.append(key, val);
        if (!(val instanceof File)) updates[key] = val;
        // else console.log("File instance found!", key);
      }
    });

    // formData.append('avatar', avatar);

    const res = await api('/users', 'PUT', formData);
    console.log(res);
    if (res && res.status >= 200 && res.status < 400) {
      const { data = {} } = res;
      const { count, avatarUrl } = data;
      // console.log(res, data)
      if (count.toString() === '1') {
        const updatedUser = { ...state.user.data, ...updates };
        if (avatarUrl) updatedUser.avatarUrl = avatarUrl;

        dispatch({
          type: user.UPDATE_USER_SUCCESS,
          payload: updatedUser,
        });
      } else {
        throw new Error('Changes Could Not Be Saved!');
      }
    }
    if (res.status >= 400 && res.status < 600) throw new Error(res.message);
  } catch (e) {
    console.log(e);
    dispatch({ type: user.UPDATE_USER_ERROR, payload: e.message || DEFAULT_ERROR_MESSAGE });
  }
  await updateUser(true);
};

export const setShowUserBasicInfoFormModal = (showModal) => async (dispatch) => {
  dispatch({
    type: user.SHOW_USER_BASIC_INFO_FORM_MODAL,
    payload: showModal,
  });
};

export const setShowUserAvatarFormModal = (showModal) => async (dispatch) => {
  dispatch({
    type: user.SHOW_USER_AVATAR_FORM_MODAL,
    payload: showModal,
  });
};

export const setShowUserDetailInfoFormModal = (showModal) => async (dispatch) => {
  dispatch({
    type: user.SHOW_USER_DETAIL_INFO_FORM_MODAL,
    payload: showModal,
  });
};


export default {
  loadUser,
  updateUser,
  setShowUserBasicInfoFormModal,
  setShowUserAvatarFormModal,
  setShowUserDetailInfoFormModal,
};
