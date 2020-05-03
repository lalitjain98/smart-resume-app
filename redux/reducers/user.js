import user from '../actionTypes/user';

const initialState = {
  showUserBasicInfoFormModal: false,
  showUserAvatarFormModal: false,
  showUserDetailInfoFormModal: false,
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
  case user.UPDATE_USER:
    return {
      ...state,
      updateUserLoading: true,
      updateUserError: null,
    };
  case user.UPDATE_USER_SUCCESS:
    return {
      ...state,
      updateUserLoading: false,
      data: action.payload,
      updateUserError: null,
    };
  case user.UPDATE_USER_ERROR:
    return {
      ...state,
      updateUserLoading: false,
      updateUserError: action.payload,
    };
  case user.SHOW_USER_BASIC_INFO_FORM_MODAL:
    return {
      ...state,
      showUserBasicInfoFormModal: action.payload,
    };
  case user.SHOW_USER_AVATAR_FORM_MODAL:
    return {
      ...state,
      showUserAvatarFormModal: action.payload,
    };
  case user.SHOW_USER_DETAIL_INFO_FORM_MODAL:
    return {
      ...state,
      showUserDetailInfoFormModal: action.payload,
    };
  default:
    return state;
  }
};
