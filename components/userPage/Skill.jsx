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
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    
    display: 'flex',
    justifyContent: 'space-between',
    // color: 'gold',
    width: '100%',
    // backgroundColor: theme.palette.secondary.dark,
    // borderRadius: theme.spacing(3),
  },
  title: {

  },
  rating: {

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
}));

function Index({ id, title, rating, ...props }) {

  const classes = useStyles();

  return (
    <Box className={`with-edit-on-hover ${classes.root}`}>
      <Box>
        <Typography className={classes.title}>
          { title }
        </Typography>
        <Rating size={'small'} name={title} value={rating} className={classes.rating} readOnly />
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(Index);
