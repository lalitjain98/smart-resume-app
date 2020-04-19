import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import UserIcon from '@material-ui/icons/Person';
import Router from 'next/router';
import DrawerMenu from './navbar/DrawerMenu';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import UserMenu from './navbar/UserMenu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  homeLink: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    width: 'fit-content',
  }
}));

function Navbar({ user, token }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const drawerMenuProps = { isOpen, openDrawer, closeDrawer };
  const classes = useStyles();

  return (
    <>
      {
        token && (
          <SwipeableDrawer
            open={isOpen}
            onClose={closeDrawer}
            onOpen={openDrawer}
          >
            <DrawerMenu {...drawerMenuProps} />
          </SwipeableDrawer>
        )
      }
      
      <Toolbar>
        {
          token && (
            <IconButton className={classes.menuButton} onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          )
        }

        <Box className={classes.title}>
          <Link href="/">
            <Typography className={classes.homeLink} variant="h6" >
              Smart Resume
            </Typography>
          </Link>
        </Box>
        {
          token ? (
            <UserMenu />
          ) : (
            <Button color="inherit" onClick={() => Router.push('/auth')}>Quick Start</Button>
          )
        }
      </Toolbar>
    </>
  );
}


const mapDispatchToProps = (dispatch) => ({
  // loadUser: () => dispatch(Actions.user.loadUser()),
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  user: state.user.data,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);
