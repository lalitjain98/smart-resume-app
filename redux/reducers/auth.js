import auth from '../actionTypes/auth';

const initialState = {

};

export default (state = initialState, action) => {
  switch (action.type) {
  case auth.LOAD_SAVED_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case auth.LOGOUT:
    return {};
  case auth.LOGIN:
    return {
      ...state, loginLoading: true, token: null, loginError: null,
    };
  case auth.LOGIN_SUCCESS:
    return {
      ...state, loginLoading: false, token: action.payload, loginError: null,
    };
  case auth.LOGIN_ERROR:
    return {
      ...state, loginLoading: true, token: null, loginError: action.payload,
    };
  case auth.SIGN_UP:
    return {
      ...state, signUpLoading: true, token: null, signUpError: null,
    };
  case auth.SIGN_UP_SUCCESS:
    return {
      ...state, signUpLoading: false, token: action.payload, signUpError: null,
    };
  case auth.SIGN_UP_ERROR:
    return {
      ...state, signUpLoading: true, token: null, signUpError: action.payload,
    };
  default:
    return state;
  }
};
