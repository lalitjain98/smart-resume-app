/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

import Loading from '../common/Loading';
import Experience from './resumeSection/Experience';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    padding: theme.spacing(1),
    margin: `${theme.spacing(1)}px 0`,
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
    cursor: (props) => props.cursor,
    '&:hover': {
      boxShadow: (props) => props.cursor === 'pointer' && `0 0 ${theme.spacing(2)}px 0 ${theme.palette.grey[500]}`,
    },
  },
  grid: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginBottom: theme.spacing(1),
    // marginTop: theme.spacing(1),
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
    top: theme.spacing(1),
    right: theme.spacing(1),
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
  emptyListText: {
    color: theme.palette.grey[500],
    padding: theme.spacing(1),
    fontSize: '0.75rem',
    fontStyle: 'italic',
  },
}));

function Index(props) {
  const { title = '', experiences = [] } = props || {};

  const classes = useStyles();


  return (
    <div onClick={props.onClick}>
      {/* <TouchRipple> */}
      <Paper className={`with-edit-on-hover ${classes.paper}`} elevation={5}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {
            experiences && experiences.length === 0 ? (
              <Grid item xs={12} className={classes.emptyListText}>
                <Box textAlign="center">
                  No Experiences in this Section
                </Box>
              </Grid>
            ) : experiences.map((item, index) => (
              // <Grid item xs={12} key={item.id}>
              <Experience
                key={item.id}
                {...item}
                wrapperComponent={Grid}
                nextSibling={(index + 1 < experiences.length) && (
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                )}
                wrapperComponentProps={{ xs: 12, item: true }}
              />
              // </Grid>
            ))
          }
        </Grid>
      </Paper>
      {/* </TouchRipple>   */}
    </div>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
