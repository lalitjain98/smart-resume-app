import React from 'react';
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
import Actions from '../../../redux/actions';
import UserIcon from '@material-ui/icons/Person';
import Router from 'next/router';
import { MenuBarOptions } from '../../../constants/userDashboard';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export const DrawerMenu = ({ isOpen, openDrawer, closeDrawer }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={closeDrawer}
      onKeyDown={closeDrawer}
    >
      <List>
        {Object.entries(MenuBarOptions).map(([id, item]) => {
          const ItemIcon = item.iconComponent;
          return (
            <ListItem button key={id} onClick={() => Router.push(item.link)}>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          )
        })}
      </List>
      <Divider />
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  activeOption: state.userDashboard.activeMenuBarOption,
})

const mapDispatchToProps = (dispatch) => ({
  setActiveOption: (option) => dispatch(Actions.userDashboard.setMenuBarOption(option)),  
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);