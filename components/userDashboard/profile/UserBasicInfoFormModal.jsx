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
import dynamic from 'next/dynamic'

const MuiPhoneInput = dynamic(
  () => import('material-ui-phone-number'),
  { ssr: false }
)

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

const UserBasicInfoFormModal = (props) => {
  const classes = useStyles();

  const [headline, setHeadline] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState(null);

  const { open, setOpen, save } = props;
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    save({ headline, mobileNumber });
    handleClose();
  };

  React.useEffect(() => {
    const { user = {} } = props;
    
    setHeadline(user.headline);
    setMobileNumber(user.mobileNumber);

  }, []);

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
        <Typography className={classes.dialogTitle}>
          Review Basic Details
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                id="headline"
                label="HeadLine"
                name="headline"
                autoComplete="off"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPhoneInput 
                defaultCountry={'in'} 
                onChange={(val) => setMobileNumber(val)}
                variant="outlined"
                required
                fullWidth
                value={mobileNumber}
                autoFormat={false}
              />
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

UserBasicInfoFormModal.propTypes = {
  open: PropTypes.bool,
};

UserBasicInfoFormModal.defaultProps = {
  open: false,
};

const mapStateToProps = (state) => ({
  open: state.user.showUserBasicInfoFormModal,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  setOpen: (showModal) => dispatch(Actions.user.setShowUserBasicInfoFormModal(showModal)),
  save: (data) => dispatch(Actions.user.updateUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBasicInfoFormModal);
