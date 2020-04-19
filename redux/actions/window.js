import window from '../actionTypes/window';

const updateWindowDims = updates => ({
  type: window.UPDATE_WINDOW_DIMS,
  payload: {
    updates,
  },
});

const updateWindowLoading = loading => ({
  type: window.UPDATE_WINDOW_LOADING,
  payload: {
    loading,
  },
});

export default {
  updateWindowDims,
  updateWindowLoading,
};
