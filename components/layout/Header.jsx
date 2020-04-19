import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Actions from '../../redux/actions';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header(props) {
 

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Navbar />
        </AppBar>
      </HideOnScroll>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  loadToken: () => dispatch(Actions.auth.loadToken()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
