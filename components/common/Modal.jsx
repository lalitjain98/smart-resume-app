import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Actions from '../../../redux/actions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
  dialog: {
    minWidth: '600px',
  },
  dialogTitle: {
    margin: 0,
    minWidth: '500px',
    display: 'flex',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const Index = (props) => {
  
  const classes = useStyles();

  const { open, setOpen } = props;

  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      className={classes.dialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <Typography variant="title" className={classes.dialogTitle}>Add New Resume Section</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Lorem Ipsum dolor sit
        </DialogContentText>
        {
          props.children
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Discard
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Index.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
};

Index.defaultProps = {
  open: false,
};


export default Index;
