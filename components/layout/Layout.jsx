import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Footer from './Footer';

import Actions from '../../redux/actions';

const useStyles = makeStyles(theme => ({
  layoutWrapper: {
    position: 'relative', 
    paddingTop: '64px',
    minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  },
  layout: {
    paddingTop: theme.spacing(1),
    minHeight: 'inherit',
  },
}));

const Layout = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const [isUserLoaded, setIsUserLoaded] = React.useState(false);
  useEffect(() => {
    console.log(router.pathname);
    const token = Cookies.get('token');
    if (token && router.pathname.startsWith('/auth')) {
      router.push('/dashboard');
    }
    console.log(token, router.pathname)
    if (!token && !['/', '/auth'].includes(router.pathname)) {
      router.push('/auth');
    }
  }, [router.pathname]);

  const { children } = props;
  React.useEffect(() => {
    if (!props.token) props.loadToken();
  }, []);

  React.useEffect(() => {
    if (props.token && !isUserLoaded) {
      props.loadUser();
    }
  }, [props.token]);

  React.useEffect(() => {
    if (props.user) setIsUserLoaded(true);
  }, [props.user]);

  return (
    <div className={classes.layoutWrapper}>
      <Header />
      <Container className={`layout ${classes.layout}`}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(Actions.user.loadUser()),
  loadToken: () => dispatch(Actions.auth.loadToken()),
});

const mapStateToProps = (state) => ({
  user: state.user.loggedInUser,
  token: state.auth.token,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
