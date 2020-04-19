import userDashboard from '../actionTypes/userDashboard';
import { MenuBarOptions } from '../../constants/userDashboard';


const initialState = {
  activeMenuBarOption: Object.keys(MenuBarOptions)[0],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case userDashboard.SET_MENU_BAR_OPTION:
    return {
      ...state,
      activeMenuBarOption: action.payload,
    };
  default:
    return state;
  }
};
