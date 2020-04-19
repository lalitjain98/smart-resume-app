import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Actions from '../../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { red, orange, lightBlue, lightGreen, pink, yellow, amber, purple, indigo, grey } from '@material-ui/core/colors'
const useStyles = makeStyles((theme) => ({
  random: {
    color: theme.palette.primary.main,
    background: 'radial-gradient(white, #ccf)',
  },
  menu: {
    paper: {
      top: '60px',
    },
  },
}))
const UserMenu = (props) => {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToDashboard = (e) => {
    e.stopPropagation();
    handleClose();
    Router.push('/dashboard');
  };

  const logOut = (e) => {
    e.stopPropagation();
    handleClose();
    props.logOut();
    Router.push('/');
  };

  const initials = props.user && [props.user.firstName, props.user.lastName].map(name => name && name.charAt(0)).join('').toUpperCase();

  return (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} edge="start" color="inherit" aria-label="menu">
        {
          props.user && (
            <Avatar className={classes.random}>
              {initials}
            </Avatar>
          )
        }
        
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
    
      >
        <MenuItem onClick={goToDashboard}>Dashboard</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(Actions.auth.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
