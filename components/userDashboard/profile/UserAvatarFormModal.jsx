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
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Actions from '../../../redux/actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
  dialog: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '600px',
    },
  },
  dialogTitle: {
    margin: 0,
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      minWidth: '500px',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  form: {

  },
  input: {
    padding: theme.spacing(0.5),
  },
}));

const UserAvatarFormModal = (props) => {
  const classes = useStyles();

  const [title, setTitle] = React.useState('');
  const [avatar, setAvatar] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const ref = React.createRef();

  React.useEffect(() => {
    if (ref) console.log(ref.current);
  }, [ref]);

  const { open, setOpen, save } = props;
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatar) save({ title, avatar });
    else save({ title });
    handleClose();
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    console.log('Just Once');
    
  }, []);

  const handleFileChange = (e) => {
    e.persist();
    console.log(e);
    console.log(ref && ref.current && ref.current.files[0]);
    const file = ref && ref.current && ref.current.files.length && ref.current.files[0];
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(file);
      setPreviewUrl(url);
    }
  };

  const resetAvatarToPrevious = () => {
    setPreviewUrl(user.avatarUrl);
    setAvatar(null);
  }

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
        <Typography className={classes.dialogTitle}>
          Review Profile Picture
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img src={previewUrl} height="100" width="100" />
            </Grid>
            <Grid item xs={6}>
              <input
                name="avatar"
                accept="image/*"
                className={classes.avatar}
                id="avatar-file"
                type="file"
                ref={ref}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Button label="Reset to Previously Saved" onClick={resetAvatarToPrevious} />
            </Grid>
          </Grid>
        </form>
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

UserAvatarFormModal.propTypes = {
  open: PropTypes.bool,
};

UserAvatarFormModal.defaultProps = {
  open: false,
};

const mapStateToProps = (state) => ({
  open: state.user.showUserAvatarFormModal,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  setOpen: (showModal) => dispatch(Actions.user.setShowUserAvatarFormModal(showModal)),
  save: (data) => dispatch(Actions.user.updateUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatarFormModal);
