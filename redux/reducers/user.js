import user from '../actionTypes/user';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
  case user.LOAD_USER:
    return {
      ...state,
      loadUserLoading: true,
      data: null,
      loadUserError: null,
    };
  case user.LOAD_USER_SUCCESS:
    return {
      ...state,
      loadUserLoading: false,
      data: action.payload,
      loadUserError: null,
    };
  case user.LOAD_USER_ERROR:
    return {
      ...state,
      loadUserLoading: false,
      data: null,
      loadUserError: action.payload,
    };
  default:
    return state;
  }
};
