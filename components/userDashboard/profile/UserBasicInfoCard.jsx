import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { startCase } from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import Loading from '../../common/Loading';
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import MailOutlineSharp from '@material-ui/icons/MailOutlineSharp';
import PhoneSharpIcon from '@material-ui/icons/PhoneSharp';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  grid: {
    margin: theme.spacing(1),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    // fontSize: theme.typography.h6
  },
  avatar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    margin: 'auto',
    background: theme.palette.secondary.main,
  },
  edit: {
    position: 'absolute',
    top: 0,
    right: 0,
    background: 'transparent',
    color: 'black',
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  withIcon: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function Index(props) {
  const classes = useStyles();
  const { user } = props;
  return (
    <Paper className={classes.paper}>
      {
        !user && <Loading />
      }
      {
        user && (
          <>
            <Avatar className={classes.edit} >
              <EditIcon className={classes.small}/>
            </Avatar>
            <Avatar className={classes.avatar} >
              <FaceIcon/>
            </Avatar>
            <Divider />
            <Grid container className={classes.grid}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.title}>
                  {startCase(`${user.firstName} ${user.lastName}`)}
                </Typography>
              </Grid>
              <Divider />
              <Grid item xs={12}>
                <Typography variant="subtitle2" className={classes.withIcon}>
                  <MailOutlineSharp className={classes.small} />
                  {user.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" className={classes.withIcon}>
                  <PhoneSharpIcon className={classes.small} />
                  {user.mobileNumber}
                </Typography>
              </Grid>
            </Grid>
          </>
        )
      }

    </Paper>
  );
}

const mapStateToProps = (state) => ({
  ...state.userDashboard,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
