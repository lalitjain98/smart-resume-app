import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import Profile from './profile/Index';
import ManageResume from './manageResume/Index';
import { MenuBarOptions } from '../../constants/userDashboard';

function Index(props) {
  const keys = Object.keys(MenuBarOptions);
  switch (props.activeMenuBarOption) {
  case keys[0]:
    return <Home {...props} />;
  case keys[1]:
    return <Profile {...props} />;
  case keys[2]:
    return <ManageResume {...props} />;
  default:
    return <Home {...props} />;
  }
}

const mapStateToProps = (state) => ({
  activeMenuBarOption: state.userDashboard.activeMenuBarOption,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
