/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { startCase } from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import MailOutlineSharp from '@material-ui/icons/MailOutlineSharp';
import PhoneSharpIcon from '@material-ui/icons/PhoneSharp';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import Loading from '../../common/Loading';
import Actions from '../../../redux/actions';
import UserDetailInfoFormModal from './UserDetailInfoFormModal';
import EmptyContentText from '../../common/EmptyContentText';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      marginTop: theme.spacing(10),
      paddingTop: theme.spacing(1),
    },
  },
  grid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    position: 'relative',
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
    zIndex: 1,
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
  gridItem: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  centered: {
    textAlign: 'center',
  },
  justified: {
    textAlign: 'justify',
  },
}));


function Index(props) {
  const {
    user, showUserDetailInfoFormModal, loadUserLoading, loadUserError,
  } = props || {};

  const classes = useStyles({ avatarUrl: user && user.avatarUrl });

  return (
    <Paper className={classes.paper} elevation={1}>
      {
        loadUserLoading && <Loading />
      }
      {
        user && (
          <>
            <UserDetailInfoFormModal />

            <Grid container className={classes.grid}>
              <Avatar className={classes.edit}>
                <EditIcon className={classes.small} onClick={() => props.setShowUserDetailInfoFormModal(true)} />
              </Avatar>
              <Grid className={classnames(classes.gridItem, classes.centered)} item xs={12}>
                <Typography variant="subtitle1" className={classes.title}>
                  {'About Me'}
                </Typography>
              </Grid>
              <Divider />
              <Grid className={classnames(classes.gridItem, classes.justified)} item xs={12}>
                {
                  user.aboutMe ? user.aboutMe.split('\n').map((line, index) => (
                    <Typography key={index} variant="subtitle2" className={classes.withIcon}>
                      {line}
                    </Typography>
                  )) : (
                    <EmptyContentText customText={"Brand yourself here!"}/>
                  )
                }
              </Grid>
              <Grid className={classes.gridItem} item xs={12}>
                {
                  user.country ? (
                    <Typography variant="subtitle2" className={classes.withIcon}>
                      {`Location: ${user.city}${user.city && ', '}${user.country}`}
                    </Typography>
                  ) : (
                    <EmptyContentText label="Your Location" />
                  )
                }
              </Grid>
              <Grid className={classes.gridItem} item xs={12}>
                {
                  user.altEmail ? (
                    <Typography variant="subtitle2" className={classes.withIcon}>
                      {`Alt. E-mail: ${user.altEmail}`}
                    </Typography>
                  ) : (
                    <EmptyContentText label="Alternate E-mail" />
                  )
                }
              </Grid>
              <Grid className={classnames(classes.gridItem, classes.centered)} item xs={12}>
                {
                  user.altMobileNumber ? (
                    <Typography variant="subtitle2" className={classes.withIcon}>
                      {`Alt. Mobile Number: ${user.altMobileNumber}`}
                    </Typography>
                  ) : (
                    <EmptyContentText label="Alternate Mobile Number" />
                  )
                }
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
  loadUserLoading: state.user.loadUserLoading,
  loadUserError: state.user.loadUserError,
  showUserDetailInfoFormModal: state.user.showUserDetailInfoFormModal,
});

const mapDispatchToProps = (dispatch) => ({
  setShowUserDetailInfoFormModal:
    (showModal) => dispatch(Actions.user.setShowUserDetailInfoFormModal(showModal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

// import React from 'react';
// import { connect } from 'react-redux';

// function Index(props) {
//   return (
//     <>
//       UserDetailInfoCard
//     </>
//   );
// }

// const mapStateToProps = (state) => ({
//   ...state.userDashboard,
// });

// const mapDispatchToProps = (dispatch) => ({

// });

// export default connect(mapStateToProps, mapDispatchToProps)(Index);
