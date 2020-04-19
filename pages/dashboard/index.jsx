import React from 'react';
import { connect } from 'react-redux';
import Main from '../../components/userDashboard/Index';
import { MenuBarOptions } from '../../constants/userDashboard';
import Actions from '../../redux/actions';
import Home from '../../components/userDashboard/Home';

export const Index = (props) => {
  React.useEffect(() => {
    props.setActiveOption(Object.keys(MenuBarOptions)[0]);
  }, []);
  return (
    <Home />
  );
}

const mapStateToProps = (state) => ({
  activeMenuBarOption: state.userDashboard.activeMenuBarOption,
})

const mapDispatchToProps = (dispatch) => ({
  setActiveOption: (option) => dispatch(Actions.userDashboard.setMenuBarOption(option)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);