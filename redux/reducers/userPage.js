import userPage from '../actionTypes/userPage';

const initialState = { };

export default (state = initialState, action) => {
  switch (action.type) {
  case userPage.LOAD_USER_BY_USERNAME:
    return {
      ...state,
      loadUserPageLoading: true,
      data: null,
      loadUserPageError: null,
    };
  case userPage.LOAD_USER_BY_USERNAME_SUCCESS:
    return {
      ...state,
      loadUserPageLoading: false,
      data: action.payload,
      loadUserPageError: null,
    };
  case userPage.LOAD_USER_BY_USERNAME_ERROR:
    return {
      ...state,
      loadUserPageLoading: false,
      data: null,
      loadUserPageError: action.payload,
    };
  case userPage.SET_USER_LINK:
    return {
      ...state,
      userLinkData: action.payload,
    };
  default:
    return state;
  }
};
