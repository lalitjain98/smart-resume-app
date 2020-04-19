import scripts from '../actionTypes/scripts';

const initialState = {
  isLoaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case scripts.SET_LOADED:
    return {
      ...state,
      isLoaded: action.payload.data,
    };
  default:
    return state;
  }
};
