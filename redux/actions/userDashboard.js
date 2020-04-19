import userDashboard from '../actionTypes/userDashboard';
import api from '../../api';
import { MenuBarOptions } from '../../constants/userDashboard';

export const setMenuBarOption = (option) => async (dispatch) => {
  dispatch({ type: userDashboard.SET_MENU_BAR_OPTION, payload: option });
};

export default {
  setMenuBarOption,
};
