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
import Loading from '../common/Loading';
import Actions from '../../redux/actions';
import EmptyContentText from '../common/EmptyContentText';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      marginTop: theme.spacing(10),
      paddingTop: theme.spacing(5),
    },
  },
  grid: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  title: {
    fontWeight: 'bold',
    // marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    // fontSize: theme.typography.h6
  },
  avatarWrapper: {
    position: 'absolute',
    top: `-${theme.spacing(5)}px`,
    left: 0,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarEdit: {
    top: `-${theme.spacing(2)}px !important`,
    right: `-${theme.spacing(4)}px !important`,
  },
  userAvatar: {
    margin: `${theme.spacing(1)}px auto`,
    width: theme.spacing(10),
    height: theme.spacing(10),
    // backgroundImage: ({ avatarUrl }) => (avatarUrl ? `url(${avatarUrl})` : 'transparent'),
    // backgroundPosition: 'center 25%',
    // backgroundRepeat: 'no-repeat',
    // display: 'block',
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
    justifyContent: 'center',
  },
  headline: {
    fontStyle: 'italic',
    fontSize: '1.1rem',
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey[900],
    justifyContent: 'center',
  },
  username: {
    color: theme.palette.primary.main,
  },
}));


function Index(props) {
  const { user = {} } = props || {};

  const classes = useStyles({ avatarUrl: user && user.avatarUrl });

  return (
    <Paper className={classes.paper} elevation={5}>
      {
        user && (
          <>
            <Box className={classes.avatarWrapper}>

              <Box className={classes.avatarContainer}>
                <Avatar
                  className={classes.userAvatar}
                  src={user.avatarUrl}
                />
              </Box>

            </Box>

            <Grid container className={classes.grid}>
              <Grid className={classnames(classes.gridItem, classes.centered)} item xs={12}>
                <Typography variant="subtitle1" className={classes.title}>
                  {startCase(`${user.firstName} ${user.lastName}`)}
                </Typography>
              </Grid>
              <Divider />

              <Grid className={classnames(classes.centered)} item xs={12}>
                {
                  user.username ? (
                    <Typography variant="subtitle2" className={classnames(classes.withIcon, classes.centered, classes.username)}>
                      <Link href={`/${user.username}`}>
                        {`@${user.username}`}
                      </Link>
                    </Typography>
                  ) : (
                    <EmptyContentText label="Username" />
                  )
                }
              </Grid>

              <Grid className={classnames(classes.gridItem, classes.centered)} item xs={12}>
                {
                  user.headline ? (
                    <Typography variant="subtitle2" className={classnames(classes.withIcon, classes.centered, classes.headline)}>
                      {user.headline}
                    </Typography>
                  ) : (
                    <EmptyContentText label="Headline" />
                  )
                }
              </Grid>
              <Grid className={classes.gridItem} item xs={12}>
                {
                  user.email ? (
                    <Typography variant="subtitle2" className={classes.withIcon}>
                      <MailOutlineSharp className={classes.small} />
                      {user.email}
                    </Typography>
                  ) : (
                    <EmptyContentText label="E-mail" />
                  )
                }
              </Grid>
              <Grid className={classes.gridItem} item xs={12}>
                {
                  user.mobileNumber ? (
                    <Typography variant="subtitle2" className={classes.withIcon}>
                      <PhoneSharpIcon className={classes.small} />
                      {user.mobileNumber || ''}
                    </Typography>
                  ) : (
                    <EmptyContentText label="Mobile Number" />
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
  ...state.userPage,
  user: state.userPage.data,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
