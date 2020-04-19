import window from '../actionTypes/window';

export default (state = { loading: false, height: 0, width: 0, sm: 600, loading: false }, action) => {
  switch (action.type) {
  case window.UPDATE_WINDOW_DIMS:
    return {
      ...state,
      ...action.payload.updates,
    };
  case window.UPDATE_WINDOW_LOADING:
    return {
      ...state,
      loading: action.payload.loading,
    };
  default:
    return state;
  }
};
