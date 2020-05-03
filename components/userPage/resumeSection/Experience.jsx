import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { startCase } from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Loading from '../../common/Loading';
import Actions from '../../../redux/actions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      margin: `${theme.spacing(1)}px 0`,
      padding: `${theme.spacing(1)}px 0`,
    },
    margin: `${theme.spacing(1)}px 0`,
    padding: theme.spacing(1),

  },
  grid: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),
    },
  },
  title: {
    fontWeight: 'bold',
    // marginBottom: theme.spacing(1),
    // marginTop: theme.spacing(1),
    // fontSize: theme.typography.h6
  },
  subtitle: {
    ...theme.typography.subtitle1,
    fontSize: '0.875rem',
    fontStyle: 'italic',
    marginBottom: '5px',
  },
  content: {
    ...theme.typography.body2,
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
    padding: '0.25rem',
    color: theme.palette.grey[800],
  },
  small: {
    fontSize: '1rem',
  },
  withIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  linkText: {
    fontWeight: theme.typography.fontWeightMedium,
    cursor: 'pointer',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

function Index(props) {
  const classes = useStyles();
  const {
    wrapperComponent: WrapperComponent, wrapperComponentProps = {}, nextSibling,
    title, subtitle, startDate, endDate, description='', linkUrl, linkText, grade, maxGrade,
    openLink,
  } = props;

  const returnVal = (
    <Box className={`with-edit-on-hover ${classes.box}`}>
      <Grid container>
        {
          startDate && (
            <Grid item xs={12}>
              <Typography component={'span'} className={classes.content}>
                {/* {moment(startDate).format('DD MMM, YYYY')} */}
                {moment(startDate).format('MMM, YYYY')}
              </Typography>
              {
                endDate && (
                  <Typography component={'span'} className={classes.content}>
                    {` - ${moment(endDate).format('MMM, YYYY')}`}
                  </Typography>
                )
              }
            </Grid>
          )
        }
        <Grid item xs={12}>
          <Typography className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.subtitle}>
            {subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {(description || '').split('\n').map((d, index) => <Typography className={classes.content} key={index}>{d}</Typography>)}
        </Grid>
        {
          linkUrl && (
            <>
              <br />
              <Grid item xs={12}>
                <Typography component="span" className={classes.linkText} onClick={() => openLink(linkUrl)}>
                  { linkText }
                </Typography>
              </Grid>
            </>
          )
        }
      </Grid>
    </Box>
  );
  
  return WrapperComponent ? (
    <WrapperComponent {...wrapperComponentProps}>
      {returnVal}
      {nextSibling}
    </WrapperComponent>
  ) : returnVal;
}

const mapStateToProps = (state) => ({
  ...state.userDashboard,
});

const mapDispatchToProps = (dispatch) => ({
  openLink: (linkUrl) => dispatch(Actions.userPage.setUserLinkUrl(linkUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
